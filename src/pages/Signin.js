import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            // signInWithEmailAndPassword(auth, email, password)
            console.log(`Welcome ${result.user.email}`)
            navigate('/todos')
        } catch (error) {
            setError(error.message)
            console.error('Error', error.message)
        }
    }
    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
                <p className='py-2'>
                    Already have an account yet?{' '}
                    <Link to='/signup' className='underline'>Sign up</Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
                </div>
                {error && <p>{error}</p>}
                <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Signin