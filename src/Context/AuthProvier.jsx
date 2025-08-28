import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase.init";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvier = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase observer to manage user state and JWT token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // If user logs in, get a JWT token from our backend
      if (currentUser) {
        axios.post('http://localhost:5000/api/users/jwt', { email: currentUser.email })
          .then(res => {
            // Save the token from our custom backend to localStorage
            localStorage.setItem('token', res.data.token);
            setLoading(false);
          })
          .catch(error => {
            console.error("JWT token fetch error:", error);
            // Even if token fetch fails, stop loading so the app can proceed
            setLoading(false);
          });
      } else {
        // If user logs out, remove the token
        localStorage.removeItem('token');
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // Firebase sign up
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Firebase log in
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Firebase log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const authInfo = {
    user,
    loading,
    creatUser,
    logIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvier;