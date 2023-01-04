import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CheckOutSteps from '../component/CheckOutSteps'
import useStore from '../context/StoreProvider'

const ShippingAddressPage = () => {
    const { state, dispatch: ctxDispatch } = useStore()
    const { cart: { shippingAddress }, userInfo } = state

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get('redirect')

    const redirect = redirectUrl ? redirectUrl : '/'


    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    // useEffect(() => {
    //     console.log(userInfo)

    //     if (!userInfo?.token) {
    //         navigate('/signin?redirect=/shipping');
    //     }

    // }, [userInfo, navigate])


    const handleSubmit = (e) => {
        e.preventDefault()

        ctxDispatch({
            type: 'save shipping address', payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        })

        navigate('/payment');

    }

    return (
        <>
            <CheckOutSteps steps1='steps1' steps2='steps2' />
            <div className='card w-75 p-3 mx-auto'>
                <h3 className='display-3 fw-bold'>Shipping Address</h3>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="inputFullName" className="form-label">Full Name</label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="form-control" id="inputFullName" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="inputAddress" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputCity" className="form-label">City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPostalCode" className="form-label">Postal Code</label>
                        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" className="form-control" id="inputPostalCode" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputCountry" className="form-label">Country</label>
                        <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" className="form-control" id="inputCountry" />
                    </div>

                    <div className='mb-3'>
                        <button className='btn btn-primary'>
                            continue
                        </button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default ShippingAddressPage