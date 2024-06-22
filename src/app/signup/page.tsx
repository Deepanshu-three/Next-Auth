'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function page() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDesiabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onSignup = async () => {

    try {
      
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data)
      router.push('/login')

    } catch (error: any) {
        console.log("Signup failed" + error.message)
        toast.error(error.message)
    }

  }

  useEffect(() => {

    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }

  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>

      <h1> {loading? "Processing" : "SignUp"} </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input type="text" id='username' value={user.username} 
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder='username'
      className='p-4 text-black '/>

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
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 my-2'
      > {buttonDesiabled? "Please fill the form" : "Sign-up"} </button>

      <Link href="/login">Visit login page</Link>
    
    </div>
  )
}

export default page