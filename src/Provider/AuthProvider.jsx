import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([])
    const [loading, setloading] = useState(true)

    // user create with email and password 
    const userCreate = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // user  profile update
    const userProfileUpdate = (name, photo) => {
        setloading(true)
        return updateProfile(auth.currentUser, {
            displayName : name,
            photoURL : photo
        })
    }


    // user login
    const userLogin = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // user logout
    const logOut = () => {
        setloading(true)
        return signOut(auth)
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('Currrent User', currentUser)
            setloading(false)
        })

        return () => {
            return unSubscribe()
        }
    }, [])



    const authInfo = {
        userCreate,
        userProfileUpdate,
        loading,
        userLogin,
        logOut
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;