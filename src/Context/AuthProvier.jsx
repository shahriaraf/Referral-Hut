
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

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvier = ({ children }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
    console.log(user);
    

  // Firebase observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // if(currentUser){

      //    const  userInfo = {
      //       UserName : currentUser.displayName,
      //       email : currentUser.email,
      //       image : currentUser.photoURL

      //     }

          
      //     try {
      //         // send user informaton  to database 
      //           const result = await axiosSecure.post('/api/users',userInfo)
              
      //       } catch (error) {
    
      // toast.error(`someting is wrong`)
      //       }

      // }

    });

    
      return () => {
        return unsubscribe();
      };

      
  },[]);

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
    const updateUserProfile = (name,image) => {
return updateProfile(auth.currentUser , {
    displayName : name,
    photoURL : image
})
    }


  // auth info
  const authInfo = {
    user,
    loading,
    creatUser,
    logIn,
    logOut,
    updateUserProfile
 
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvier;
