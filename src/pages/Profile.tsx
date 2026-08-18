import {
  ArrowLeft,
  CaretRight,
  Gear,
  LockKey,
  SignOut,
  User,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, firestore } from "../config/firebase";
import type {
  ProfileOption,
  UserProfile,
} from "../types/profile";

import "../styles/Profile.css";
import SidebarNav from "../components/SidebarNav";

const emptyProfile: UserProfile = {
  
  name: "",
  email: "",
  phone: "",
  location: "",
  image: "",
};

const profileOptions: ProfileOption[] = [
  {
    title: "Edit Profile",
    description: "Update your personal information",
    route: "/editProfile",
    icon: User,
    color: "#8b5cf6",
  },
  {
    title: "Settings",
    description: "Manage your preferences",
    route: "/profile",
    icon: Gear,
    color: "#10b981",
  },
  {
    title: "Privacy Policy",
    description: "Read our privacy policy",
    route: "/profile",
    icon: LockKey,
    color: "#64748b",
  },
];

function Profile() {
  const navigate = useNavigate();


  const [profile, setProfile] =
    useState<UserProfile>(emptyProfile);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loggingOut, setLoggingOut] =
    useState<boolean>(false);

  /*
   * Retrieve the logged-in user's profile from Firestore.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (!firebaseUser) {
          navigate("/login", { replace: true });
          return;
        }

        try {
          setLoading(true);
          setError("");

          const userReference = doc(
            firestore,
            "users",
            firebaseUser.uid,
          );

          const userSnapshot = await getDoc(userReference);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();

            /*
             * Do not use old Expo file:// image paths.
             * React web requires an HTTP/HTTPS image URL.
             */
            const validImage =
              typeof data.image === "string" &&
              (data.image.startsWith("https://") ||
                data.image.startsWith("http://"))
                ? data.image
                : "";

            setProfile({
              name:
                typeof data.name === "string"
                  ? data.name
                  : firebaseUser.displayName ?? "User",
              email:
                typeof data.email === "string"
                  ? data.email
                  : firebaseUser.email ?? "",
              phone:
                typeof data.phone === "string"
                  ? data.phone
                  : "",
              location:
                typeof data.location === "string"
                  ? data.location
                  : "",
              image: validImage,
            });
          } else {
            setProfile({
              name: firebaseUser.displayName ?? "User",
              email: firebaseUser.email ?? "",
              phone: "",
              location: "",
              image: firebaseUser.photoURL ?? "",
            });
          }
        } catch (profileError) {
          console.error(
            "Error retrieving profile:",
            profileError,
          );

          setError("Unable to load your profile.");
        } finally {
          setLoading(false);
        }
      },
    );

    return unsubscribe;
  }, [navigate]);

  function handleLogout(): void {
    const confirmed = window.confirm(
      "Are you sure you want to log out?",
    );

    if (confirmed) {
      console.log("User logged out");
      navigate("/login");
    }
  }

  return (

    <div className="profile-layout">

        <SidebarNav/>
         <main className="profile-page">
      <div className="profile-page-container">
        <header className="profile-page-header">
          <button
            type="button"
            className="profile-back-button"
            onClick={() => navigate("/dashboard")}
            aria-label="Go back to dashboard"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>

          <div>
            <h1>Profile</h1>
            <p>Manage your account and preferences.</p>
          </div>
        </header>

        <section className="profile-layout">
          <article className="profile-user-card">
            <div className="profile-avatar">
              {profile.image ? (
                  <img
                    src={profile.image}
                    alt={`${profile.name}'s profile`}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <User size={75} weight="fill" />
                )}
            </div>

             <h2>{profile.name || "User"}</h2>
              <p>{profile.email}</p>

              {profile.phone && (
                <p className="profile-extra-detail">
                  {profile.phone}
                </p>
              )}

              {profile.location && (
                <p className="profile-extra-detail">
                  {profile.location}
                </p>
              )}


            <button
              type="button"
              className="edit-profile-button"
              onClick={() => navigate("/editProfile")}
            >
              Edit Profile
            </button>
          </article>

          <div className="profile-options">
            {profileOptions.map((option) => {
              const OptionIcon = option.icon;

              return (
                <button
                  type="button"
                  className="profile-option"
                  key={option.title}
                  onClick={() => navigate(option.route)}
                >
                  <span
                    className="profile-option-icon"
                    style={{ backgroundColor: option.color }}
                  >
                    <OptionIcon size={21} weight="fill" />
                  </span>

                  <span className="profile-option-content">
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </span>

                  <CaretRight
                    className="profile-option-arrow"
                    size={18}
                  />
                </button>
              );
            })}

            <button
              type="button"
              className="profile-option logout-option"
              onClick={handleLogout}
            >
              <span className="profile-option-icon logout-icon">
                <SignOut size={21} weight="bold" />
              </span>

              <span className="profile-option-content">
                <strong>Logout</strong>
                <small>Sign out from your account</small>
              </span>

              <CaretRight
                className="profile-option-arrow"
                size={18}
              />
            </button>
          </div>
        </section>
      </div>
    </main>
    </div>
   
  );
}

export default Profile;