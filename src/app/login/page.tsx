'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function loginPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDesiabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onLogin = async () => {

    try {
      
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("login success", response.data)
      router.push('/profile')

    } catch (error: any) {
        console.log("Signup failed" + error.message)
        toast.error(error.message)
    }

  }

  useEffect(() => {

    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }

  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>

      <h1> {loading? "Processing" : "Login"} </h1>
      <hr />

      <label htmlFor="email">email</label>
      <input type="text" id='email' value={user.email} 
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      className='p-4 text-black '/>

      <label htmlFor="password">password</label>
      <input type="password" id='password' value={user.password} 
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      className='p-4 text-black '/>

      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 my-2'
      > {buttonDesiabled? "No login" : "login"} </button>

      <Link href="/signup">Visit Sign-up page page</Link>
    
    </div>
  )
}

export default loginPage