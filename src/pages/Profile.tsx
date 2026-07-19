import {
  ArrowLeft,
  CaretRight,
  Gear,
  LockKey,
  SignOut,
  User,
} from "@phosphor-icons/react";

import { useNavigate } from "react-router-dom";

import type {
  ProfileOption,
  UserProfile,
} from "../types/profile";

import "../styles/Profile.css";
import SidebarNav from "../components/SidebarNav";

const user: UserProfile = {
  name: "Reshika",
  email: "reshika@gmail.com",
  phone: "+61 400 123 456",
  location: "Adelaide, South Australia",
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
    route: "/settings",
    icon: Gear,
    color: "#10b981",
  },
  {
    title: "Privacy Policy",
    description: "Read our privacy policy",
    route: "/privacy",
    icon: LockKey,
    color: "#64748b",
  },
];

function Profile() {
  const navigate = useNavigate();

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
              {user.image ? (
                <img src={user.image} alt={user.name} />
              ) : (
                <User size={75} weight="fill" />
              )}
            </div>

            <h2>{user.name}</h2>
            <p>{user.email}</p>

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