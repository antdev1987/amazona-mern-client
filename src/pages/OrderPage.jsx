import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'
import getError from '../utils/getError'
import useStore from '../context/StoreProvider'
import { useReducer } from 'react'
import Spinner from '../component/Spinner'
import MessageBox from '../component/MessageBox'
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import formatFecha from '../utils/formatFecha'

const initState = { loading: false, error: '', order: {}, successPay: false, loadingPay: false }

const reducer = (state, action) => {
  switch (action.type) {
    case 'create request':
      return { ...state, loading: true }

    case 'success request':
      return { ...state, loading: false, order: action.payload }

    case 'fail request':
      return { ...state, loading: false, error: action.payload }

    case 'pay request':
      return { ...state, loadingPay: true }

    case 'pay success':
      return { ...state, loadingPay: false, successPay: true }

    case 'PAY_FAIL':
      return { ...state, loadingPay: false };

    case 'pay rest':
      return { ...state, loadingPay: false, successPay: false }

    default:
      return state
  }



}

const OrderPage = () => {

  const { state } = useStore()
  const { userInfo } = state

  //this is to fetch the id from backend using useEffect
  const { id: orderId } = useParams()

  const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer,
    initState)

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          description: 'pagando producto de amazona ecommerce',
          amount: {
            value: order.totalOrder
          },
        },
      ],
    })

  }

  function onApprove(data, actions) {

    return actions.order.capture().then(async function (details) {

      try {
        dispatch({ type: 'pay request' })
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const url = `${import.meta.env.VITE_API_BASE_URL}/orders/${order._id}/pay`

        const { data } = await axios.put(url, details, config)
        dispatch({ type: 'pay success', payload: data })
        toast.success('order is paid')

      } catch (error) {
        dispatch({ type: 'PAY_FAIL', payload: getError(error) })
        console.log(error)
      }

    })

  }

  function onError(err) {
    toast.error(getError(err))
  }


  // use effect to fetch orders and the client id of paypal
  useEffect(() => {
    const fetchOrder = async () => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      try {
        dispatch({ type: 'create request' })
        const { data } = await axios.get(url, config)
        // console.log(data)
        dispatch({ type: 'success request', payload: data })
      } catch (error) {
        dispatch({ type: 'fail request', payload: getError(error) })
      }
    }

    //funcion para cargar el client id de paypal
    const loadPaypalScript = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      const url = `${import.meta.env.VITE_API_BASE_URL}/keys/paypal`

      const { data: clientId } = await axios.get(url, config)

      //we use this option in case we dont load the client id at the beggining
      //with this we load the client id from the banckend and pass it down with bellow options
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD'
        }
      })
      //es para cargar el scrip ya que al inicio se uso deferLoading a true,
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
    }

    // condicion para cargar la orden por medio de id y lugo el cient id de paypal
    if (!order._id || successPay) {
      fetchOrder()

      if (successPay) {
        dispatch({ type: 'pay reset' })
      }

    } else {
      loadPaypalScript()
    }

  }, [order._id, successPay])


  return (
    <>

      {loading && <Spinner />}
      {error && <MessageBox modo='error'>{error}</MessageBox>}
      {!error && !loading && (
        <>
          <h1>Order {order._id}</h1>

          <div className='row'>

            <div className='col-8'>

              <div className="card mb-3">
                <div className="card-header fw-bold">
                  Shipping
                </div>
                <div className="card-body">
                  <p className="card-text ">
                    <strong>Name:</strong> {order.shippingAddress?.fullName} <br />
                    <strong>Address:</strong> {order.shippingAddress?.address},  {order.shippingAddress?.city},  {order.shippingAddress?.postalCode},  {order.shippingAddress?.country}
                  </p>
                  {
                    order.isDelivered ? (
                      <MessageBox>Delivered at {order.deliveredAt}</MessageBox>
                    ) : (
                      <MessageBox modo='error'>Not Delivered</MessageBox>
                    )
                  }
                </div>
              </div>


              <div className="card mb-3">
                <div className="card-header fw-bold">
                  Payment
                </div>
                <div className="card-body">
                  <p className="card-text ">
                    <strong>Method:</strong> {order.paymentMethod} <br />
                  </p>
                  {
                    order.isPaid ? (
                      <MessageBox>Paid at {formatFecha(order.paidAt)}</MessageBox>
                    ) : (
                      <MessageBox modo='error'>Not Paid</MessageBox>
                    )
                  }
                </div>
              </div>


              <div className="card mb-3">
                <div className="card-header fw-bold">
                  Items
                </div>
                <div className="card-body">


                  <ul className="list-group list-group-flush">
                    {
                      order?.orderItems?.map(item => (

                        <li key={item._id} className="list-group-item">
                          <div className='row'>
                            <div className='col-6'>
                              <img src={item.image} className="img-thumbnail" alt="..." style={{ height: '70px' }} />
                              <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </div>
                            <div className='col-3 my-auto'>qty: {item.quantity}</div>
                            <div className='col-3 my-auto'>${item.price}</div>
                          </div>
                        </li>

                      ))
                    }
                  </ul>

                </div>
              </div>


            </div>


            <div className='col-4'>

              <div className="card mb-3">
                <div className="card-header fw-bold">
                  Order Summary
                </div>
                <div className="card-body">


                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className='row'>
                        <div className='col'>Items</div>
                        <div className='col'>${order.itemsPrice}</div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className='row'>
                        <div className='col'>Shipping</div>
                        <div className='col'>${order.shippingPrice}</div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className='row'>
                        <div className='col'>Tax</div>
                        <div className='col'>${order.tax}</div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className='row'>
                        <div className='col'>Order Total</div>
                        <div className='col'>${order.totalOrder}</div>
                      </div>
                    </li>

                    {
                      !order.isPaid && (
                        <li className='list-group-item'>
                          {isPending ? (
                            <Spinner />
                          ) : (
                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              >

                              </PayPalButtons>
                            </div>
                          )
                          }
                          {loadingPay && <Spinner />}
                        </li>
                      )
                    }

                  </ul>



                </div>
              </div>

            </div>

          </div>
        </>
      )}

    </>
  )
}

export default OrderPage