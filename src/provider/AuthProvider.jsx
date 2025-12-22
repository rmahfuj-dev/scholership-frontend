import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import useAxios from "../hooks/useAxios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const signUpWithEmailPassFunc = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailPassFunc = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateProfileFunc = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const googleSignInFunc = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassEmailFunc = (email) => {
    setAuthLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const signOutFunc = async () => {
    setAuthLoading(true);
    try {
      await axiosInstance.post("/logout"); // Clear cookie on server
      return signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Observer for user persistence (Page Reloads)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // If page is refreshed, ensure token exists
        const userInfo = { email: currentUser.email };
        try {
          await axiosInstance.post("/getToken", userInfo);
        } catch (error) {
          console.error("Token refresh failed", error);
        }
      } else {
        // If no user, ensure cookie is cleared
        await axiosInstance.post("/logout");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [axiosInstance]);

  const authInfo = {
    user,
    setUser,
    authLoading,
    setAuthLoading,
    signUpWithEmailPassFunc,
    signOutFunc,
    updateProfileFunc,
    signInWithEmailPassFunc,
    googleSignInFunc,
    resetPassEmailFunc,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
