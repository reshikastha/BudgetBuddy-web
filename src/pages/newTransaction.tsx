import {
   CalendarBlank,
  CaretDown,
  CaretRight,
  House,
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

import "../styles/NewTransaction.css";
import SidebarNav from "../components/SidebarNav";

type TransactionKind = "expense" | "income";

type TransactionFormData = {
  type: TransactionKind;
  amount: string;
  wallet: string;
  category: string;
  date: string;
  description: string;
   receipt?: File | null;
};

type SelectOption = {
  label: string;
  value: string;
};

const walletOptions: SelectOption[] = [
  {
    label: "Salary",
    value: "salary",
  },
  {
    label: "Side Hustle",
    value: "side-hustle",
  },
  {
    label: "Cash Wallet",
    value: "cash",
  },
];

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
    label: "Others",
    value: "others",
  },
];

function NewTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<TransactionFormData>({
      type: "expense",
      amount: "",
      wallet: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      receipt: null,
    });

  const [message, setMessage] = useState<string>("");
    const receiptInputRef = useRef<HTMLInputElement>(null);

    const [receiptPreview, setReceiptPreview] = useState<string>("");
    const [receiptError, setReceiptError] = useState<string>("");

  function updateField(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >,
  ): void {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
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
    setReceiptError("Please select a PNG, JPG or WebP image.");
    return;
  }

  if (file.size > maximumSize) {
    setReceiptError("Receipt image must be smaller than 5MB.");
    return;
  }

  if (receiptPreview) {
    URL.revokeObjectURL(receiptPreview);
  }

  setFormData((currentData) => ({
    ...currentData,
    receipt: file,
  }));

  setReceiptPreview(URL.createObjectURL(file));
  setReceiptError("");
}

function removeReceipt(): void {
  if (receiptPreview) {
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
  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0) {
      setMessage("Please enter a valid transaction amount.");
      return;
    }

    if (!formData.wallet) {
      setMessage("Please select a wallet.");
      return;
    }

    if (
      formData.type === "expense" &&
      !formData.category
    ) {
      setMessage("Please select an expense category.");
      return;
    }

    setMessage(
      `${
        formData.type === "expense" ? "Expense" : "Income"
      } transaction submitted successfully.`,
    );

    console.log(formData);
  }


  useEffect(() => {
  return () => {
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }
  };
}, [receiptPreview]);
  return (

    <div className="new-transaction">

        <SidebarNav/>
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
            Add a new income or expense to keep your finances
            up to date.
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
                      formData.type === "expense"
                        ? "expense-type-icon"
                        : "income-type-icon"
                    }`}
                  >
                    {formData.type === "expense" ? (
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
                  >
                    <option value="expense">
                      Expense
                    </option>

                    <option value="income">
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
                  >
                    <option value="" disabled>
                      Select wallet
                    </option>

                    {walletOptions.map((wallet) => (
                      <option
                        key={wallet.value}
                        value={wallet.value}
                      >
                        {wallet.label}
                      </option>
                    ))}
                  </select>

                  <CaretDown
                    className="select-arrow"
                    size={15}
                  />
                </div>
              </label>

              {formData.type === "expense" && (
                <label className="transaction-field">
                  <span>Expense Category</span>

                  <div className="select-wrapper">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={updateField}
                    >
                      <option value="" disabled>
                        Select category
                      </option>

                      {expenseCategories.map((category) => (
                        <option
                          key={category.value}
                          value={category.value}
                        >
                          {category.label}
                        </option>
                      ))}
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
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={updateField}
                    required
                  />

                  <span className="currency-symbol">$</span>
                </div>
              </label>

              <label className="transaction-field description-field">
                <span>
                  Description{" "}
                  <small>(Optional)</small>
                </span>

                <div className="textarea-wrapper">
                  <textarea
                    name="description"
                    placeholder="Add a note about this transaction..."
                    maxLength={200}
                    value={formData.description}
                    onChange={updateField}
                  />

                  <span className="character-counter">
                    {formData.description.length}/200
                  </span>
                </div>
              </label>
            </div>
          </div>

          <p
            className="transaction-form-message"
            aria-live="polite"
          >
            {message}
          </p>

          {formData.type === "expense" && (
        <div className="transaction-field receipt-field">
            <span>
            Receipt Image <small>(Optional)</small>
            </span>

            <div
            className="receipt-upload-area"
            onClick={() => receiptInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
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
                    <strong>{formData.receipt?.name}</strong>
                    <span>Click to replace this receipt</span>
                    </div>
                </div>
                </div>
            ) : (
                <div className="receipt-upload-placeholder">
                <div className="receipt-upload-icon">
                    <UploadSimple size={26} weight="bold" />
                </div>

                <div>
                    <strong>Upload receipt image</strong>
                    <p>PNG, JPG or WebP. Maximum size 5MB.</p>
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
            />

            {receiptError && (
            <span className="receipt-error">{receiptError}</span>
            )}
        </div>
        )}

          <div className="transaction-form-actions">
            <button
              type="button"
              className="transaction-cancel-button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="transaction-submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
    </div>
  
  );
}

export default NewTransaction;