import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const authContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        return unsubscribe();
      }
  },[])

  

  const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name,photo) =>{
   return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
  }

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile 
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
