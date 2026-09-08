

import {
  CalendarBlank,
  CaretDown,
  CaretRight,
  ImageSquare,
  TrendDown,
  TrendUp,
  UploadSimple,
  X,
} from "@phosphor-icons/react";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  auth,
  firestore,
  storage,
} from "../config/firebase";

import { useFinance } from "../context/FinanceContext";
import SidebarNav from "../components/SidebarNav";

import "../styles/NewTransaction.css";

type TransactionKind = "Expense" | "Income";

type TransactionFormData = {
  type: TransactionKind;
  amount: string;
  wallet: string;
  category: string;
  date: string;
  description: string;
  receipt: File | null;
};

type SelectOption = {
  label: string;
  value: string;
};

const expenseCategories: SelectOption[] = [
  {
    label: "Groceries",
    value: "groceries",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Utilities",
    value: "utilities",
  },
  {
    label: "Transportation",
    value: "transportation",
  },
  {
    label: "Dining",
    value: "dining",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "Health",
    value: "health",
  },
  {
    label: "Shopping",
    value: "shopping",
  },
  {
    label: "Personal",
    value: "personal",
  },
  {
    label: "Insurance",
    value: "insurance",
  },
  {
    label: "Clothing",
    value: "clothing",
  },
  {
    label: "Others",
    value: "others",
  },
];

function getCurrentDate(): string {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  const month = String(
    currentDate.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(currentDate.getDate()).padStart(
    2,
    "0",
  );

  return `${year}-${month}-${day}`;
}

function NewTransaction() {
  const navigate = useNavigate();
  const receiptInputRef =
    useRef<HTMLInputElement>(null);

  const {
    wallets,
    loading: financeLoading,
  } = useFinance();

  const [formData, setFormData] =
    useState<TransactionFormData>({
      type: "Expense",
      amount: "",
      wallet: "",
      category: "",
      date: getCurrentDate(),
      description: "",
      receipt: null,
    });

  const [receiptPreview, setReceiptPreview] =
    useState<string>("");

  const [receiptError, setReceiptError] =
    useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  function updateField(
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >,
  ): void {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setMessage("");
  }

  function handleReceiptChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    const maximumSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setReceiptError(
        "Please select a PNG, JPG or WebP image.",
      );

      event.target.value = "";
      return;
    }

    if (file.size > maximumSize) {
      setReceiptError(
        "Receipt image must be smaller than 5MB.",
      );

      event.target.value = "";
      return;
    }

    if (receiptPreview.startsWith("blob:")) {
      URL.revokeObjectURL(receiptPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((currentData) => ({
      ...currentData,
      receipt: file,
    }));

    setReceiptPreview(previewUrl);
    setReceiptError("");
    setMessage("");
  }

  function removeReceipt(): void {
    if (receiptPreview.startsWith("blob:")) {
      URL.revokeObjectURL(receiptPreview);
    }

    setReceiptPreview("");
    setReceiptError("");

    setFormData((currentData) => ({
      ...currentData,
      receipt: null,
    }));

    if (receiptInputRef.current) {
      receiptInputRef.current.value = "";
    }
  }

  async function uploadReceiptImage(
    userId: string,
    file: File,
  ): Promise<string> {
    const safeFileName = file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_",
    );

    const receiptReference = ref(
      storage,
      `users/${userId}/receipts/${Date.now()}-${safeFileName}`,
    );

    const uploadResult = await uploadBytes(
      receiptReference,
      file,
      {
        contentType: file.type,
      },
    );

    return getDownloadURL(uploadResult.ref);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const firebaseUser = auth.currentUser;
    const amount = Number(formData.amount);

    if (!firebaseUser) {
      setMessage(
        "You must be logged in to add a transaction.",
      );
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setMessage(
        "Please enter a valid transaction amount.",
      );
      return;
    }

    if (!formData.wallet) {
      setMessage("Please select a wallet.");
      return;
    }

    if (
      formData.type === "Expense" &&
      !formData.category
    ) {
      setMessage(
        "Please select an expense category.",
      );
      return;
    }

    if (!formData.date) {
      setMessage("Please select a date.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setReceiptError("");

      let receiptUrl: string | null = null;

      if (
        formData.type === "Expense" &&
        formData.receipt
      ) {
        receiptUrl = await uploadReceiptImage(
          firebaseUser.uid,
          formData.receipt,
        );
      }

      /*
       * Midday is used to prevent the selected date from
       * moving backwards because of timezone conversion.
       */
      const selectedDate = new Date(
        `${formData.date}T12:00:00`,
      );

      if (Number.isNaN(selectedDate.getTime())) {
        setMessage("Please select a valid date.");
        return;
      }

      const transactionReference = doc(
        collection(firestore, "transactions"),
      );

      const walletReference = doc(
        firestore,
        "wallets",
        formData.wallet,
      );

      const transactionCategory =
        formData.type === "Income"
          ? "Income"
          : formData.category;

      const batch = writeBatch(firestore);

      /*
       * Add the transaction document.
       */
      batch.set(transactionReference, {
        id: transactionReference.id,
        uid: firebaseUser.uid,
        walletId: formData.wallet,
        type: formData.type,
        amount,
        category: transactionCategory,
        description: formData.description.trim(),
        date: Timestamp.fromDate(selectedDate),
        image: receiptUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      /*
       * Update the selected wallet.
       */
      if (formData.type === "Income") {
        batch.update(walletReference, {
          amount: increment(amount),
          totalIncome: increment(amount),
          updatedAt: serverTimestamp(),
        });
      } else {
        batch.update(walletReference, {
          amount: increment(-amount),
          totalExpense: increment(amount),
          updatedAt: serverTimestamp(),
        });
      }

      await batch.commit();

      /*
       * FinanceContext onSnapshot automatically receives
       * the new transaction.
       */
      navigate("/transactions", {
        replace: true,
      });
    } catch (error: unknown) {
      console.error(
        "Unable to add transaction:",
        error,
      );

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        setMessage(
          `Unable to add transaction: ${String(
            error.code,
          )}`,
        );
      } else {
        setMessage(
          "Unable to add transaction. Please try again.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    return () => {
      if (receiptPreview.startsWith("blob:")) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  return (
    <div className="new-transaction">
      <SidebarNav />

      <main className="new-transaction-page">
        <div className="transaction-page-container">
          <nav
            className="transaction-breadcrumb"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <CaretRight size={13} />

            <span>New Transaction</span>
          </nav>

          <header className="transaction-page-header">
            <h1>New Transaction</h1>

            <p>
              Add a new income or expense to keep your
              finances up to date.
            </p>
          </header>

          <form
            className="new-transaction-form"
            onSubmit={handleSubmit}
          >
            <div className="transaction-form-grid">
              <div className="transaction-left-column">
                <label className="transaction-field">
                  <span>Type</span>

                  <div className="select-wrapper">
                    <span
                      className={`transaction-type-icon ${
                        formData.type === "Expense"
                          ? "expense-type-icon"
                          : "income-type-icon"
                      }`}
                    >
                      {formData.type === "Expense" ? (
                        <TrendDown
                          size={16}
                          weight="bold"
                        />
                      ) : (
                        <TrendUp
                          size={16}
                          weight="bold"
                        />
                      )}
                    </span>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={updateField}
                      disabled={saving}
                    >
                      <option value="expense">
                        Expense
                      </option>

                      <option value="Income">
                        Income
                      </option>
                    </select>

                    <CaretDown
                      className="select-arrow"
                      size={15}
                    />
                  </div>
                </label>

                <label className="transaction-field">
                  <span>Wallet</span>

                  <div className="select-wrapper">
                    <select
                      name="wallet"
                      value={formData.wallet}
                      onChange={updateField}
                      required
                      disabled={
                        financeLoading || saving
                      }
                    >
                      <option value="" disabled>
                        {financeLoading
                          ? "Loading wallets..."
                          : "Select wallet"}
                      </option>

                      {wallets.map((wallet) => {
                        const walletId =
                          wallet.id !== undefined &&
                          wallet.id !== null
                            ? String(wallet.id)
                            : "";

                        if (!walletId) {
                          return null;
                        }

                        return (
                          <option
                            key={walletId}
                            value={walletId}
                          >
                            {wallet.name ||
                              "Unnamed Wallet"}
                          </option>
                        );
                      })}
                    </select>

                    <CaretDown
                      className="select-arrow"
                      size={15}
                    />
                  </div>

                  {!financeLoading &&
                    wallets.length === 0 && (
                      <small className="transaction-wallet-warning">
                        Create a wallet before adding a
                        transaction.
                      </small>
                    )}
                </label>

                {formData.type === "Expense" && (
                  <label className="transaction-field">
                    <span>Expense Category</span>

                    <div className="select-wrapper">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={updateField}
                        required
                        disabled={saving}
                      >
                        <option value="" disabled>
                          Select category
                        </option>

                        {expenseCategories.map(
                          (category) => (
                            <option
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </option>
                          ),
                        )}
                      </select>

                      <CaretDown
                        className="select-arrow"
                        size={15}
                      />
                    </div>
                  </label>
                )}

                <label className="transaction-field">
                  <span>Date</span>

                  <div className="date-input-wrapper">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={updateField}
                      required
                      disabled={saving}
                    />

                    <CalendarBlank
                      className="date-icon"
                      size={18}
                    />
                  </div>
                </label>
              </div>

              <div className="transaction-right-column">
                <label className="transaction-field">
                  <span>Amount</span>

                  <div className="amount-input-wrapper">
                    <input
                      type="number"
                      name="amount"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={updateField}
                      required
                      disabled={saving}
                    />

                    <span className="currency-symbol">
                      $
                    </span>
                  </div>
                </label>

                <label className="transaction-field description-field">
                  <span>
                    Description <small>(Optional)</small>
                  </span>

                  <div className="textarea-wrapper">
                    <textarea
                      name="description"
                      placeholder="Add a note about this transaction..."
                      maxLength={200}
                      value={formData.description}
                      onChange={updateField}
                      disabled={saving}
                    />

                    <span className="character-counter">
                      {formData.description.length}/200
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {formData.type === "Expense" && (
              <div className="transaction-field receipt-field">
                <span>
                  Receipt Image <small>(Optional)</small>
                </span>

                <div
                  className="receipt-upload-area"
                  onClick={() => {
                    if (!saving) {
                      receiptInputRef.current?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      !saving &&
                      (event.key === "Enter" ||
                        event.key === " ")
                    ) {
                      receiptInputRef.current?.click();
                    }
                  }}
                >
                  {receiptPreview ? (
                    <div className="receipt-preview-container">
                      <img
                        src={receiptPreview}
                        alt="Uploaded transaction receipt"
                        className="receipt-preview-image"
                      />

                      <button
                        type="button"
                        className="remove-receipt-button"
                        disabled={saving}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeReceipt();
                        }}
                        aria-label="Remove receipt"
                      >
                        <X size={16} weight="bold" />
                      </button>

                      <div className="receipt-file-information">
                        <ImageSquare size={19} />

                        <div>
                          <strong>
                            {formData.receipt?.name}
                          </strong>

                          <span>
                            Click to replace this receipt
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="receipt-upload-placeholder">
                      <div className="receipt-upload-icon">
                        <UploadSimple
                          size={26}
                          weight="bold"
                        />
                      </div>

                      <div>
                        <strong>
                          Upload receipt image
                        </strong>

                        <p>
                          PNG, JPG or WebP. Maximum size
                          5MB.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={receiptInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleReceiptChange}
                  className="hidden-receipt-input"
                  disabled={saving}
                />

                {receiptError && (
                  <span className="receipt-error">
                    {receiptError}
                  </span>
                )}
              </div>
            )}

            {message && (
              <p
                className="transaction-form-message"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            <div className="transaction-form-actions">
              <button
                type="button"
                className="transaction-cancel-button"
                onClick={() =>
                  navigate("/transactions")
                }
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="transaction-submit-button"
                disabled={
                  saving ||
                  financeLoading ||
                  wallets.length === 0
                }
              >
                {saving ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewTransaction;