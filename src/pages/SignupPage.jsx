import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import getError from '../utils/getError'
import useStore from '../context/StoreProvider'
import { toast } from 'react-toastify'


const SignupPage = () => {

  const [name, setName] = useState()  
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [confirmPassowrd, setConfirmPassword] = useState()

  const {state, dispatch:cxtDispatch} = useStore()
  const {userInfo} = state

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectUrl = searchParams.get('redirect')
  const redirect = redirectUrl ? redirectUrl : '/'


  // useEffect(()=>{

  //   console.log(userInfo)

  //   if(userInfo?.token){
  //     navigate(redirect)
  //   }

  // },[userInfo])

  const handleSubmit =async(e)=>{
    e.preventDefault()

    if(password !== confirmPassowrd){
      toast.error('password do not match')
      return
    }

    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/user/signup`
      const {data} = await axios.post(url,{name,email,password})
      cxtDispatch({type:'user signin', payload:data})
      console.log(redirect)
      navigate(redirect)
    } catch (error) {
      toast.error(getError(error))
    }
  }


  

  return (
    <div>
      <div className="card m-auto" style={{ 'maxWidth': '30rem' }}>
        <div className="card-body">
          <h3 className="card-title">Sign Up</h3>
          <form onSubmit={handleSubmit}>

          <div className="mb-3">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="inputName" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input  onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
              <input  onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword2" />
            </div>

            <div className='mb-3'>
              <button type="submit" className="btn btn-warning">Sign Up</button>
            </div>

            <div className='mb-3'>
              Already have an account?{' '}
              <Link to={`/signin?redirect=${redirect}`}>Create Your Account</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage