import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const[loading,setLoading]=useState(true)
    const[user,setUser] = useState(null)

    const createUser =(email,password)=>{
        setLoading(true)

        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const signOutUser =()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUser=(updatedData)=>{
        return updateProfile(auth.currentUser, updatedData)
    }


    useEffect(()=>{

        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
          setUser(currentUser)
          setLoading(false)
          console.log('user in authstate changed',currentUser)
        })

        return()=>{
            unSubscribe()
        }

    },[])

    const authInfo ={
        loading,
        user,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
        updateUser

    }
    return (
       <AuthContext value={authInfo}>
        {
            children
        }

       </AuthContext>
    );
};

export default AuthProvider;