import {
  ArrowLeft,
  Camera,
  EnvelopeSimple,
  MapPin,
  Phone,
  User,
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

import type { UserProfile } from "../types/profile";

import "../styles/Profile.css";
import SidebarNav from "../components/SidebarNav";

const initialProfile: UserProfile = {
  name: "Reshika",
  email: "reshika@gmail.com",
  phone: "+61 400 123 456",
  location: "Adelaide, South Australia",
  image: "",
};

function EditProfile() {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] =
    useState<UserProfile>(initialProfile);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string>(initialProfile.image);

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  function updateProfile(
    field: keyof UserProfile,
    value: string,
  ): void {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  function handleImageChange(
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

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a PNG, JPG or WebP image.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Profile image must be smaller than 3MB.");
      return;
    }

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  }

  function removeImage(): void {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!profile.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!profile.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    console.log({
      profile,
      selectedImage,
    });

    setError("");
    setMessage("Your profile has been updated successfully.");
  }

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (

    <div className="profile-layout">

        <SidebarNav/>
    <main className="profile-page">
      <div className="profile-page-container">
        <header className="profile-page-header">
          <button
            type="button"
            className="profile-back-button"
            onClick={() => navigate("/profile")}
            aria-label="Go back to profile"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>

          <div>
            <h1>Edit Profile</h1>
            <p>Update your personal information and photo.</p>
          </div>
        </header>

        <form
          className="edit-profile-form"
          onSubmit={handleSubmit}
        >
          <section className="edit-avatar-section">
            <div className="edit-avatar">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                />
              ) : (
                <User size={74} weight="fill" />
              )}

              {imagePreview && (
                <button
                  type="button"
                  className="remove-profile-image"
                  onClick={removeImage}
                  aria-label="Remove profile image"
                >
                  <X size={16} weight="bold" />
                </button>
              )}
            </div>

            <div className="image-upload-information">
              <h2>Profile Photo</h2>

              <p>
                Upload a PNG, JPG or WebP image. Maximum size 3MB.
              </p>

              <button
                type="button"
                className="change-photo-button"
                onClick={() => imageInputRef.current?.click()}
              >
                <Camera size={18} weight="bold" />
                {imagePreview ? "Change Photo" : "Upload Photo"}
              </button>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden-profile-input"
              />
            </div>
          </section>

          <section className="profile-form-fields">
            <label className="profile-form-field">
              <span>Full Name</span>

              <div className="profile-input-wrapper">
                <User size={20} weight="fill" />

                <input
                  type="text"
                  value={profile.name}
                  placeholder="Enter your full name"
                  onChange={(event) =>
                    updateProfile("name", event.target.value)
                  }
                  required
                />
              </div>
            </label>

            <label className="profile-form-field">
              <span>Email Address</span>

              <div className="profile-input-wrapper">
                <EnvelopeSimple size={20} weight="fill" />

                <input
                  type="email"
                  value={profile.email}
                  placeholder="Enter your email address"
                  onChange={(event) =>
                    updateProfile("email", event.target.value)
                  }
                  required
                />
              </div>
            </label>

            <label className="profile-form-field">
              <span>Phone Number</span>

              <div className="profile-input-wrapper">
                <Phone size={20} weight="fill" />

                <input
                  type="tel"
                  value={profile.phone}
                  placeholder="Enter your phone number"
                  onChange={(event) =>
                    updateProfile("phone", event.target.value)
                  }
                />
              </div>
            </label>

            <label className="profile-form-field">
              <span>Location</span>

              <div className="profile-input-wrapper">
                <MapPin size={20} weight="fill" />

                <input
                  type="text"
                  value={profile.location}
                  placeholder="Enter your location"
                  onChange={(event) =>
                    updateProfile("location", event.target.value)
                  }
                />
              </div>
            </label>
          </section>

          {error && (
            <p className="profile-error-message">{error}</p>
          )}

          <p
            className="profile-success-message"
            aria-live="polite"
          >
            {message}
          </p>

          <div className="edit-profile-actions">
            <button
              type="button"
              className="cancel-profile-button"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-profile-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
    </div>
  );
}

export default EditProfile;