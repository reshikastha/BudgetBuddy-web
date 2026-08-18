import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { updateProfile } from "firebase/auth";

import {
  auth,
  firestore,
  storage,
} from "../config/firebase";

import type {
  ProfileFormData,
  UserProfile,
} from "../types/profile";

export async function getUserProfile(
  uid: string,
): Promise<UserProfile | null> {
  const userReference = doc(
    firestore,
    "users",
    uid,
  );

  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    return null;
  }

  const data = userSnapshot.data();

  return {
    uid,
    name: data.name ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    location: data.location ?? "",
    image: data.image ?? "",
  };
}

export async function uploadProfileImage(
  uid: string,
  file: File,
): Promise<string> {
  const safeFilename = file.name.replace(
    /[^a-zA-Z0-9._-]/g,
    "_",
  );

  const imageReference = ref(
    storage,
    `users/${uid}/profile/${Date.now()}-${safeFilename}`,
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

type UpdateProfileParameters = {
  uid: string;
  formData: ProfileFormData;
  newImage?: File | null;
};

export async function saveUserProfile({
  uid,
  formData,
  newImage,
}: UpdateProfileParameters): Promise<UserProfile> {
  let imageURL = formData.image;

  if (newImage) {
    imageURL = await uploadProfileImage(uid, newImage);
  }

  const updatedProfile: UserProfile = {
    uid,
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    location: formData.location.trim(),
    image: imageURL,
  };

  await setDoc(
    doc(firestore, "users", uid),
    {
      ...updatedProfile,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: updatedProfile.name,
      photoURL: imageURL || null,
    });
  }

  return updatedProfile;
}