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

import type { UserProfile, ProfileFormData } from "../types/profile";

import { useAuth } from "../context/AuthContext";

import {
  getUserProfile,
  saveUserProfile,
} from "../service/profileService";

import "../styles/Profile.css";
import SidebarNav from "../components/SidebarNav";


const emptyForm: ProfileFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  image: "",
};

function canDisplayStoredImage(image: string): boolean {
  return (
    image.startsWith("https://") ||
    image.startsWith("http://")
  );
}

function EditProfile() {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);


   const { user, loading: authLoading, updateUserData } =
    useAuth();

  const [formData, setFormData] =
    useState<ProfileFormData>(emptyForm);
  const [profile, setProfile] =
    useState<UserProfile>(emptyForm);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string>(emptyForm.image);

  const [loadingProfile, setLoadingProfile] =
    useState<boolean>(true);

  const [saving, setSaving] =
    useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");



  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user?.uid) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    async function loadProfile(): Promise<void> {
      try {
        setLoadingProfile(true);
        setError("");

        const profile = await getUserProfile(user!.uid);

        if (!profile) {
          setError("Your profile document was not found.");
          return;
        }

        setFormData({
          name: profile?.name,
          email: profile?.email,
          phone: profile?.phone,
          location: profile?.location,
          image: canDisplayStoredImage(profile?.image)
            ? profile?.image
            : "",
        });

        /*
         * A file:/// image saved by Expo cannot be displayed
         * in the website, so it is intentionally ignored.
         */

        setImagePreview(
          canDisplayStoredImage(profile.image)
            ? profile.image
            : "",
        );
      } catch (loadError) {
        console.error("Profile retrieval error:", loadError);

        setError(
          "Unable to retrieve your profile. Please try again.",
        );
      } finally {
        setLoadingProfile(false);
      }
    }

    void loadProfile();
  }, [authLoading, user?.uid, navigate]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function updateProfile(
    field: keyof UserProfile,
  value: string,
): void {
  setProfile((currentProfile) => ({
    ...currentProfile,
    [field]: value,
  }));

  setMessage("");
  setError("");
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
    setMessage("");
  }

  function removeImage(): void {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
     setImagePreview(formData.image);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
     event.preventDefault();

    if (!user?.uid) {
      setError("You must be logged in.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const updatedProfile: UserProfile =
        await saveUserProfile({
          uid: user.uid,
          formData,
          newImage: selectedImage,
        });

      setFormData({
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        location: updatedProfile.location,
        image: updatedProfile.image,
      });

      setSelectedImage(null);
      setImagePreview(updatedProfile.image);

      /*
       * Refresh the user stored in AuthContext.
       */

      await updateUserData(user.uid);

      setMessage("Your profile was updated successfully.");
      navigate("/profile");
     
    } catch (saveError) {
      console.error("Profile update error:", saveError);

      setError(
        "Unable to update your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

console.log({message})

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
                  alt={`${formData.name || "User"} profile`}
                />
              ) : (
                <User size={74} weight="fill" />
              )}

              {selectedImage && (
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
                  value={formData.name}
                  placeholder="Enter your full name"
                  onChange={(event) =>
                    updateProfile("name", event.target.value)
                  }
                  
                />
              </div>
            </label>

            <label className="profile-form-field">
              <span>Email Address</span>

              <div className="profile-input-wrapper">
                <EnvelopeSimple size={20} weight="fill" />

                <input
                  type="email"
                  value={formData.email}
                  readOnly
                />
              </div>
            </label>

            <label className="profile-form-field">
              <span>Phone Number</span>

              <div className="profile-input-wrapper">
                <Phone size={20} weight="fill" />

                <input
                  type="tel"
                  value={formData.phone}
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
                  value={formData.location}
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
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-profile-button"
              disabled={saving}
            >
               {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
    </div>
  );
}

export default EditProfile;