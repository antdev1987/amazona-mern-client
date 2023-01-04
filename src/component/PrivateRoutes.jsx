import React, { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import useStore from '../context/StoreProvider'

//this not allowed to go back to login page if your are already logged in
const PrivateRoutes = ({children}) => {

    const {state} = useStore()
    const {userInfo} = state

    //  const navigate = useNavigate()
    // const [searchParams] = useSearchParams()
    // const redirectUrl = searchParams.get('redirect')
  
    // const redirect = redirectUrl ? redirectUrl : '/'

    // console.log(redirect)

  return userInfo?.name ? children : <Navigate to='/' replace />
}

export default PrivateRoutes