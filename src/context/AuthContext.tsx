import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { FirebaseError } from "firebase/app";

import { auth, firestore } from "../config/firebase";

import type {
  AuthContextType,
  AuthProviderProps,
  AuthResponse,
  UserType,
} from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

function getFirebaseErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/invalid-credential":
      return "The email or password is incorrect.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/weak-password":
      return "Please choose a stronger password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your connection.";

    default:
      return error.message || "Authentication failed.";
  }
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function updateUserData(uid: string): Promise<void> {
    try {
      const userDocument = await getDoc(
        doc(firestore, "users", uid),
      );

      if (userDocument.exists()) {
        const data = userDocument.data();

        setUser({
          uid,
          email: data.email ?? auth.currentUser?.email ?? null,
          name:
            data.name ??
            auth.currentUser?.displayName ??
            null,
          image: data.image ?? null,
        });

        return;
      }

      // Firebase Auth user exists, but Firestore document
      // has not been created.

      const firebaseUser = auth.currentUser;

      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          image: firebaseUser.photoURL,
        });
      }
    } catch (error) {
      console.error("Unable to retrieve user profile:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              image: firebaseUser.photoURL,
            });

            await updateUserData(firebaseUser.uid);
          } else {
            setUser(null);
          }
        } finally {
          setLoading(false);
        }
      },
    );

    return unsubscribe;
  }, []);

  async function login(
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      return {
        success: true,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getFirebaseErrorMessage(error),
      };
    }
  }

  async function register(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResponse> {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await updateProfile(credential.user, {
        displayName: name.trim(),
      });

      const newUser: UserType = {
        uid: credential.user.uid,
        email: credential.user.email,
        name: name.trim(),
        image: null,
      };

      await setDoc(
        doc(firestore, "users", credential.user.uid),
        {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
      );

      setUser(newUser);

      return {
        success: true,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getFirebaseErrorMessage(error),
      };
    }
  }

  async function logout(): Promise<AuthResponse> {
    try {
      await signOut(auth);

      return {
        success: true,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getFirebaseErrorMessage(error),
      };
    }
  }

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      setUser,
      login,
      register,
      logout,
      updateUserData,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}