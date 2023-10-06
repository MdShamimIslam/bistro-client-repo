import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const authContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if(currentUser){
        fetch('http://localhost:5000/jwt',{
          method:'POST',
          headers:{
            'content-type' : 'application/json'
          },
          body:JSON.stringify({email : currentUser.email})
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('access-token', data.token);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        })
      }
      else{
        localStorage.removeItem('access-token');
        setLoading(false);
      }
     

      // todo:
      // if(currentUser){
      //   axios.post('http://localhost:5000/jwt', { email: currentUser.email})
      //   .then(data => {
      //     localStorage.setItem('access-token', data.data);
         
      //   })
      // } else{
      //   localStorage.removeItem('access-token');
      // }

      

      
      
    });
    return () => {
      return unsubscribe();
    }
  }, []);

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

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleLogin,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
