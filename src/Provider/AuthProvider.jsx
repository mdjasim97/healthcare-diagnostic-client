import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import auth from "../Firebase/Firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('');
    const [loading, setloading] = useState(true);
    const axiosPublic = useAxiosPublic()

    // user create with email and password 
    const userCreate = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // user  profile update
    const userProfileUpdate = (name, photo) => {
        setloading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
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

            if (currentUser) {
                const userEmail = { email: currentUser.email }
                axiosPublic.post('/jwt', userEmail)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
            }

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
        logOut,
        user
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;