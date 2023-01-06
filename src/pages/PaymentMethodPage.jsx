import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from '../component/CheckOutSteps'
import useStore from '../context/StoreProvider'

const PaymentMethodPage = () => {

  const { state, dispatch: ctxDispatch } = useStore()
  const { cart:{shippingAddress, paymentMethod} } = state

  const [paymentMethodName, setPaymentMehod] = useState(paymentMethod || 'PayPal')

  const navigate = useNavigate()

// to check if we have added a shipping address before
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping')
    }

  }, [shippingAddress])

  const handleSubmit = (e) => {
    e.preventDefault()

    ctxDispatch({ type: 'save payment method', payload: paymentMethodName })
    navigate('/placeorder')
  }

  return (
    <>
      <CheckOutSteps steps1='steps1' steps2='steps2' steps3='steps3' />
      <div className='card w-75 p-3 mx-auto'>
        <h3 className='display-3 fw-bold'>Payment Method</h3>
        <form onSubmit={handleSubmit}>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value='PayPal'
              // {paymentMethodName === 'Paypal' ? checked : ''}
              checked = {paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMehod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              PayPal
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value='Stripe'
              checked = {paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMehod(e.target.value)}


            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Stripe
            </label>
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

export default PaymentMethodPage