import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const TestingaPage = () => {
    const [user] = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        navigate('/');
        try {
            await signOut(auth);
            navigate('/');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    }
    console.log('user TestingPage: ', user)
    return (
        <div className='max-w-[600px] mx-auto my-16 p-4'>
            <h1 className='text-2xl font-bold py-4'>Account</h1>
            <p>User Email: {user && user?.email}</p>

            <button onClick={handleLogout} className='border px-6 py-2 my-4'>
                Logout
            </button>
        </div>
    )
}

export default TestingaPage