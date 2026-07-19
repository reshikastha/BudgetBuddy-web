import {
  ArrowLeft,
  ImageSquare,
  UploadSimple,
  X,
} from "@phosphor-icons/react";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";

import "../styles/NewWallet.css";
import SidebarNav from "../components/SidebarNav";
import { useNavigate } from "react-router-dom";

type WalletFormData = {
  name: string;
  image: File | null;
};

function NewWallet() {
      const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [walletData, setWalletData] = useState<WalletFormData>({
    name: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  function selectImage(file: File): void {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    const maximumSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please select a PNG, JPG or WebP image.");
      return;
    }

    if (file.size > maximumSize) {
      setMessage("The image must be smaller than 2MB.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setWalletData((currentData) => ({
      ...currentData,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
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

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      selectImage(file);
    }
  }

  function removeImage(): void {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setWalletData((currentData) => ({
      ...currentData,
      image: null,
    }));

    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!walletData.name.trim()) {
      setMessage("Please enter a wallet name.");
      return;
    }

    setMessage(`"${walletData.name}" wallet is ready to be saved.`);

    console.log({
      walletName: walletData.name,
      walletImage: walletData.image,
    });
  }

  function handleCancel(): void {
    setWalletData({
      name: "",
      image: null,
    });

    setImagePreview("");
    setMessage("");

    window.history.back();
  }

  return (
    
    <div className="new-wallet">
        <SidebarNav/>
    <main className="new-wallet-page">
      <section className="new-wallet-container">
        <button
          type="button"
          className="back-button"
            onClick={() => navigate("/wallet")}
        
        >
          <ArrowLeft size={21} weight="bold" />
        </button>

        <header className="new-wallet-header">
          <h1>New Wallet</h1>

          <p>Create a new wallet to organise your money.</p>
        </header>

        <form className="new-wallet-form" onSubmit={handleSubmit}>
          <label className="wallet-name-field">
            <span>Wallet Name</span>

            <input
              type="text"
              name="walletName"
              placeholder="Enter wallet name"
              value={walletData.name}
              onChange={(event) =>
                setWalletData((currentData) => ({
                  ...currentData,
                  name: event.target.value,
                }))
              }
              required
            />
          </label>

          <div className="wallet-image-field">
            <span>Wallet Icon</span>

            <div
              className={`upload-area ${
                isDragging ? "upload-area-dragging" : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
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
                    onClick={(event) => {
                      event.stopPropagation();
                      removeImage();
                    }}
                    aria-label="Remove image"
                  >
                    <X size={18} weight="bold" />
                  </button>

                  <p>{walletData.image?.name}</p>
                  <span>Click or drop another image to replace it</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">
                    <UploadSimple size={31} weight="bold" />
                  </div>

                  <strong>Upload an image</strong>

                  <p>
                    PNG, JPG or WebP. Maximum file size 2MB.
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
            />
          </div>

          <p className="wallet-form-message" aria-live="polite">
            {message}
          </p>

          <div className="wallet-form-actions">
            <button
              type="button"
              className="cancel-wallet-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="add-wallet-button">
              <ImageSquare size={18} weight="bold" />
              Add Wallet
            </button>
          </div>
        </form>
      </section>
    </main>
    </div>
  );
}

export default NewWallet;