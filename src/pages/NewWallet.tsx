// import {
//   ArrowLeft,
//   ImageSquare,
//   UploadSimple,
//   X,
// } from "@phosphor-icons/react";

// import {
//   useRef,
//   useState,
//   type ChangeEvent,
//   type DragEvent,
//   type FormEvent,
// } from "react";

// import "../styles/NewWallet.css";
// import SidebarNav from "../components/SidebarNav";
// import { useNavigate } from "react-router-dom";

// type WalletFormData = {
//   name: string;
//   image: File | null;
// };

// function NewWallet() {
//       const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [walletData, setWalletData] = useState<WalletFormData>({
//     name: "",
//     image: null,
//   });

//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");

//   function selectImage(file: File): void {
//     const allowedTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/webp",
//     ];

//     const maximumSize = 2 * 1024 * 1024;

//     if (!allowedTypes.includes(file.type)) {
//       setMessage("Please select a PNG, JPG or WebP image.");
//       return;
//     }

//     if (file.size > maximumSize) {
//       setMessage("The image must be smaller than 2MB.");
//       return;
//     }

//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview);
//     }

//     setWalletData((currentData) => ({
//       ...currentData,
//       image: file,
//     }));

//     setImagePreview(URL.createObjectURL(file));
//     setMessage("");
//   }

//   function handleFileChange(
//     event: ChangeEvent<HTMLInputElement>,
//   ): void {
//     const file = event.target.files?.[0];

//     if (file) {
//       selectImage(file);
//     }
//   }

//   function handleDrop(event: DragEvent<HTMLDivElement>): void {
//     event.preventDefault();
//     setIsDragging(false);

//     const file = event.dataTransfer.files?.[0];

//     if (file) {
//       selectImage(file);
//     }
//   }

//   function removeImage(): void {
//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview);
//     }

//     setWalletData((currentData) => ({
//       ...currentData,
//       image: null,
//     }));

//     setImagePreview("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>): void {
//     event.preventDefault();

//     if (!walletData.name.trim()) {
//       setMessage("Please enter a wallet name.");
//       return;
//     }

//     setMessage(`"${walletData.name}" wallet is ready to be saved.`);

//     console.log({
//       walletName: walletData.name,
//       walletImage: walletData.image,
//     });
//   }

//   function handleCancel(): void {
//     setWalletData({
//       name: "",
//       image: null,
//     });

//     setImagePreview("");
//     setMessage("");

//     window.history.back();
//   }

//   return (
    
//     <div className="new-wallet">
//         <SidebarNav/>
//     <main className="new-wallet-page">
//       <section className="new-wallet-container">
//         <button
//           type="button"
//           className="back-button"
//             onClick={() => navigate("/wallet")}
        
//         >
//           <ArrowLeft size={21} weight="bold" />
//         </button>

//         <header className="new-wallet-header">
//           <h1>New Wallet</h1>

//           <p>Create a new wallet to organise your money.</p>
//         </header>

//         <form className="new-wallet-form" onSubmit={handleSubmit}>
//           <label className="wallet-name-field">
//             <span>Wallet Name</span>

//             <input
//               type="text"
//               name="walletName"
//               placeholder="Enter wallet name"
//               value={walletData.name}
//               onChange={(event) =>
//                 setWalletData((currentData) => ({
//                   ...currentData,
//                   name: event.target.value,
//                 }))
//               }
//               required
//             />
//           </label>

//           <div className="wallet-image-field">
//             <span>Wallet Icon</span>

//             <div
//               className={`upload-area ${
//                 isDragging ? "upload-area-dragging" : ""
//               }`}
//               onClick={() => fileInputRef.current?.click()}
//               onDragEnter={(event) => {
//                 event.preventDefault();
//                 setIsDragging(true);
//               }}
//               onDragOver={(event) => {
//                 event.preventDefault();
//                 setIsDragging(true);
//               }}
//               onDragLeave={(event) => {
//                 event.preventDefault();
//                 setIsDragging(false);
//               }}
//               onDrop={handleDrop}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter" || event.key === " ") {
//                   fileInputRef.current?.click();
//                 }
//               }}
//             >
//               {imagePreview ? (
//                 <div className="image-preview-container">
//                   <img
//                     src={imagePreview}
//                     alt="Selected wallet icon"
//                     className="image-preview"
//                   />

//                   <button
//                     type="button"
//                     className="remove-image-button"
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       removeImage();
//                     }}
//                     aria-label="Remove image"
//                   >
//                     <X size={18} weight="bold" />
//                   </button>

//                   <p>{walletData.image?.name}</p>
//                   <span>Click or drop another image to replace it</span>
//                 </div>
//               ) : (
//                 <div className="upload-placeholder">
//                   <div className="upload-icon">
//                     <UploadSimple size={31} weight="bold" />
//                   </div>

//                   <strong>Upload an image</strong>

//                   <p>
//                     PNG, JPG or WebP. Maximum file size 2MB.
//                   </p>

//                   <span>
//                     Click to browse or drag and drop
//                   </span>
//                 </div>
//               )}
//             </div>

//             <input
//               ref={fileInputRef}
//               className="hidden-file-input"
//               type="file"
//               accept="image/png,image/jpeg,image/webp"
//               onChange={handleFileChange}
//             />
//           </div>

//           <p className="wallet-form-message" aria-live="polite">
//             {message}
//           </p>

//           <div className="wallet-form-actions">
//             <button
//               type="button"
//               className="cancel-wallet-button"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>

//             <button type="submit" className="add-wallet-button">
//               <ImageSquare size={18} weight="bold" />
//               Add Wallet
//             </button>
//           </div>
//         </form>
//       </section>
//     </main>
//     </div>
//   );
// }

// export default NewWallet;

// src/pages/NewWallet.tsx

import {
  ArrowLeft,
  ImageSquare,
  UploadSimple,
  X,
} from "@phosphor-icons/react";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
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

import SidebarNav from "../components/SidebarNav";

import "../styles/NewWallet.css";

type WalletFormData = {
  name: string;
  image: File | null;
};

function NewWallet() {
  const navigate = useNavigate();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [walletData, setWalletData] =
    useState<WalletFormData>({
      name: "",
      image: null,
    });

  const [imagePreview, setImagePreview] =
    useState<string>("");

  const [isDragging, setIsDragging] =
    useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  function selectImage(file: File): void {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    const maximumSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        "Please select a PNG, JPG or WebP image.",
      );
      return;
    }

    if (file.size > maximumSize) {
      setMessage(
        "The image must be smaller than 2MB.",
      );
      return;
    }

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setWalletData((currentData) => ({
      ...currentData,
      image: file,
    }));

    setImagePreview(previewUrl);
    setMessage("");
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    const file = event.target.files?.[0];

    if (file) {
      selectImage(file);
    }
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ): void {
    event.preventDefault();

    if (saving) {
      return;
    }

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      selectImage(file);
    }
  }

  function removeImage(): void {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setWalletData((currentData) => ({
      ...currentData,
      image: null,
    }));

    setImagePreview("");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function uploadWalletImage(
    userId: string,
    walletId: string,
    file: File,
  ): Promise<string> {
    const safeFileName = file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_",
    );

    const imageReference = ref(
      storage,
      `users/${userId}/wallets/${walletId}/${Date.now()}-${safeFileName}`,
    );

    const uploadResult = await uploadBytes(
      imageReference,
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
    const walletName = walletData.name.trim();

    if (!firebaseUser) {
      setMessage(
        "You must be logged in to create a wallet.",
      );
      return;
    }

    if (!walletName) {
      setMessage("Please enter a wallet name.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      /*
       * Generate the wallet document ID first.
       */
      const walletReference = doc(
        collection(firestore, "wallets"),
      );

      let imageUrl: string | null = null;

      /*
       * Upload the optional image to Firebase Storage.
       */
      if (walletData.image) {
        imageUrl = await uploadWalletImage(
          firebaseUser.uid,
          walletReference.id,
          walletData.image,
        );
      }

      /*
       * Create the wallet document in Firestore.
       */
      await setDoc(walletReference, {
        id: walletReference.id,
        uid: firebaseUser.uid,
        name: walletName,
        image: imageUrl,
        amount: 0,
        totalIncome: 0,
        totalExpense: 0,
        created: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      /*
       * FinanceContext onSnapshot will automatically
       * receive the new wallet.
       */
      navigate("/wallet", {
        replace: true,
      });
    } catch (error: unknown) {
      console.error(
        "Unable to create wallet:",
        error,
      );

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        setMessage(
          `Unable to create wallet: ${String(
            error.code,
          )}`,
        );
      } else {
        setMessage(
          "Unable to create wallet. Please try again.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  function handleCancel(): void {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setWalletData({
      name: "",
      image: null,
    });

    setImagePreview("");
    setMessage("");

    navigate("/wallet");
  }

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="new-wallet">
      <SidebarNav />

      <main className="new-wallet-page">
        <section className="new-wallet-container">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/wallet")}
            disabled={saving}
            aria-label="Go back to wallets"
          >
            <ArrowLeft size={21} weight="bold" />
          </button>

          <header className="new-wallet-header">
            <h1>New Wallet</h1>

            <p>
              Create a new wallet to organise your money.
            </p>
          </header>

          <form
            className="new-wallet-form"
            onSubmit={handleSubmit}
          >
            <label className="wallet-name-field">
              <span>Wallet Name</span>

              <input
                type="text"
                name="walletName"
                placeholder="Enter wallet name"
                value={walletData.name}
                maxLength={50}
                disabled={saving}
                onChange={(event) => {
                  setWalletData((currentData) => ({
                    ...currentData,
                    name: event.target.value,
                  }));

                  setMessage("");
                }}
                required
              />
            </label>

            <div className="wallet-image-field">
              <span>
                Wallet Icon <small>(Optional)</small>
              </span>

              <div
                className={`upload-area ${
                  isDragging
                    ? "upload-area-dragging"
                    : ""
                }`}
                onClick={() => {
                  if (!saving) {
                    fileInputRef.current?.click();
                  }
                }}
                onDragEnter={(event) => {
                  event.preventDefault();

                  if (!saving) {
                    setIsDragging(true);
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();

                  if (!saving) {
                    setIsDragging(true);
                  }
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                role="button"
                tabIndex={saving ? -1 : 0}
                aria-disabled={saving}
                onKeyDown={(event) => {
                  if (
                    !saving &&
                    (event.key === "Enter" ||
                      event.key === " ")
                  ) {
                    fileInputRef.current?.click();
                  }
                }}
              >
                {imagePreview ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Selected wallet icon"
                      className="image-preview"
                    />

                    <button
                      type="button"
                      className="remove-image-button"
                      disabled={saving}
                      onClick={(event) => {
                        event.stopPropagation();
                        removeImage();
                      }}
                      aria-label="Remove image"
                    >
                      <X size={18} weight="bold" />
                    </button>

                    <p>
                      {walletData.image?.name}
                    </p>

                    <span>
                      Click or drop another image to replace
                      it
                    </span>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">
                      <UploadSimple
                        size={31}
                        weight="bold"
                      />
                    </div>

                    <strong>Upload an image</strong>

                    <p>
                      PNG, JPG or WebP. Maximum file size
                      2MB.
                    </p>

                    <span>
                      Click to browse or drag and drop
                    </span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                className="hidden-file-input"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                disabled={saving}
              />
            </div>

            {message && (
              <p
                className="wallet-form-message"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            <div className="wallet-form-actions">
              <button
                type="button"
                className="cancel-wallet-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="add-wallet-button"
                disabled={saving}
              >
                <ImageSquare
                  size={18}
                  weight="bold"
                />

                {saving
                  ? "Adding Wallet..."
                  : "Add Wallet"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default NewWallet;