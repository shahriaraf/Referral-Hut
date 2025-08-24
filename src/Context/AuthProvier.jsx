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
import useAxiosPublic from "../CustomHooks/Api/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvier = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(user);

  // Firebase observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  (currentUser) => {
      setUser(currentUser);
      setLoading(false);

     


        return () => {
      return unsubscribe();
    };



    });

  
  }, []);

  // firebase sign up
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //  firebase log in

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // firebase  log out

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

  // auth info
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
