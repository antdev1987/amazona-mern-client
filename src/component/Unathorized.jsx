import React from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import useStore from '../context/StoreProvider'

//this not allowed to go back to login page if your are already logged in
const Unathorized = ({children}) => {

    const {state} = useStore()
    const {userInfo} = state
    
    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get('redirect')
  
    const redirect = redirectUrl ? redirectUrl : '/'

    // console.log(redirect)

    // console.log(userInfo)
    // console.log(state)

  return !userInfo?.name ? children : <Navigate to={redirect} replace />
}

export default Unathorized