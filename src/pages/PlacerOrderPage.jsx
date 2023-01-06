import React from 'react'
import { useReducer } from 'react'
import { Link } from 'react-router-dom'
import CheckOutSteps from '../component/CheckOutSteps'
import useStore from '../context/StoreProvider'
import { toast } from 'react-toastify'
import getError from '../utils/getError'
import axios from 'axios'

function reducer (state,action){
  switch(action.type){
    case 'create request':
      return {...state , loading:true}

    case 'success request':
      return {...state , loading:false}

    case 'fail request':
      return {...state, loading:false}

    default: return state
  }
}

const PlacerOrderPage = () => {

  //reducer from context
  const { state, dispatch: ctxDispatch } = useStore()
  const { cart, userInfo } = state

  //reducer local
  const [{loading}, dispatch] = useReducer(reducer,{loading:false})


  cart.itemsPrice = cart.cartItems.reduce((a, b) => {
    return a + (b.price * b.quantity)
  }, 0)
  cart.tax = (cart.itemsPrice * 15) / 100
  cart.totalOrder = cart.itemsPrice + cart.tax
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10.00;


  const placeOrderHandler = async() => {

    try {
      dispatch({type:'create request'})
      
      // info to send to backend (token , and body information)
      const config = {headers:{Authorization: `Bearer ${userInfo.token}`}}
      const bodyParameters = {
        orderItems: cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        tax: cart.tax,
        shippingPrice:cart.shippingPrice,
        totalOrder: cart.totalOrder
      }
      const url = `${import.meta.env.VITE_API_BASE_URL}/orders`

      const {data} = await axios.post(url,bodyParameters,config)
      dispatch({type:'success request'})
      localStorage.removeItem('cartItems');
      ctxDispatch({type:'cart clear'})
      console.log(data)

      
    } catch (error) {
      dispatch({type:'fail request'})
      toast.error(getError(error))
    }

  }


  return (
    <>
      <CheckOutSteps steps1='steps1' steps2='steps2' steps3='steps3' steps4='steps4' />

      <h3 className='display-5 fw-bold'>Preview Order</h3>

      <div className='row'>

        <div className='col-8'>

          <div className="card mb-3">
            <div className="card-header fw-bold">
              Shipping
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cart.shippingAddress.address},  {cart.shippingAddress.city},  {cart.shippingAddress.postalCode},  {cart.shippingAddress.country}
              </p>
              <Link to="/shipping" >Edit</Link>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header fw-bold">
              Payment
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Method:</strong> {cart.paymentMethod} <br />
              </p>
              <Link to="/payment" >Edit</Link>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header fw-bold">
              Items
            </div>
            <div className="card-body">


              <ul className="list-group list-group-flush">
                {
                  cart.cartItems.map(item => (

                    <li key={item._id} className="list-group-item">
                      <div className='row'>
                        <div className='col-6'>
                          <img src={item.image} className="img-thumbnail" alt="..." style={{ height: '70px' }} />
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </div>
                        <div className='col-3 my-auto'>{item.quantity}</div>
                        <div className='col-3 my-auto'>${item.price}</div>
                      </div>
                    </li>

                  ))
                }
              </ul>
              <Link to='/cart' >Edit</Link>
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
                    <div className='col'>${cart.itemsPrice}</div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className='row'>
                    <div className='col'>Shipping</div>
                    <div className='col'>${cart.shippingPrice}</div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className='row'>
                    <div className='col'>Tax</div>
                    <div className='col'>${cart.tax}</div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className='row'>
                    <div className='col'>Order Total</div>
                    <div className='col'>${cart.totalOrder}</div>
                  </div>
                </li>

              </ul>


              <button onClick={placeOrderHandler} className='btn btn-warning' >Placer order</button>
            </div>
          </div>

        </div>

      </div>



    </>
  )
}

export default PlacerOrderPage