import { createContext, useContext, useEffect, useState } from 'react';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const currentUser = auth.onAuthStateChanged(authUser => {
            setUser(authUser)
        })
        return () => currentUser()
    }, [])
    // const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    // const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
    // const logout = () => signOut(auth)
    // let values = { user, logout, register, login }
    return (
        <UserContext.Provider value={[user]}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext)