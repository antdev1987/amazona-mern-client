import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../context/StoreProvider'
import axios from 'axios'
import { useEffect } from 'react'

const CartPage = () => {

  const { state, dispatch:cxtDispatch } = useStore()
  const { cart: { cartItems }, userInfo } = state

  const navigate = useNavigate()

  // useEffect(()=>{

  //   if(cartItems.length === 0){

  //   }

  // },[cartItems])

  const updateCartHandle =async(item, quantity) =>{

    console.log(quantity)

    try {
      
      const {data} = await axios(`${import.meta.env.VITE_API_BASE_URL}/products/${item._id}`)

      console.log(data)
      if(data.stock < quantity){
        alert('no more product')
        return
      }
      
      cxtDispatch({ type: 'add to cart', payload: { ...item, quantity } })
      
    } catch (error) {
      console.log(error)
    }

  }

  const deleteCartHandler = async(id)=>{
    cxtDispatch({type : 'remove item cart', payload: id})
  }

  const checkoutHandler = () => {

    navigate(userInfo?.token ? '/shipping' : '/signin?redirect=/shipping');
  };

  return (
    <>
      <h2>Shopping Cart</h2>

      <div className='row'>

        <div className='col-md-8'>

          {/* if not item show this */}
          {
            cartItems.length === 0 && (
              <h6>Cart is Empty <Link to='/'>go to shopping cart</Link></h6>
            )
          }

          {/* if item show items */}

          {
            cartItems.length > 0 && (
              <ul className="list-group">
                {
                  cartItems.map(item => (
                    <li key={item._id} className="list-group-item">
                      <div className='row align-items-center'>

                        <div className='col-4'>
                          <img src={item.image} className="img-thumbnail" style={{ height: '70px' }} alt="..." /> {''}
                          <Link to={`/product/${item.slug}`} className=' '>{item.name}</Link>
                        </div>

                        <div className='col-4'>
                          <button onClick={()=>updateCartHandle(item, item.quantity - 1)} className={`btn btn-outline-light border-0 ${item.quantity === 1 && 'disabled'}`} ><i className="bi text-secondary fs-4 bi-dash-circle-fill"></i></button>{''}
                          <span>{item.quantity}</span>
                          <button  onClick={()=>updateCartHandle(item, item.quantity + 1)} className={`btn btn-outline-light border-0 ${item.quantity === item.countInStock && 'disabled'}`}><i className="bi text-secondary fs-4 bi-plus-circle-fill"></i></button>{''}
                        </div>

                        <div className='col-2'>
                          ${item.price}
                        </div>

                        <div className='col-2'>
                          <button onClick={()=> deleteCartHandler(item._id)} className=' btn btn-outline-light border-0' ><i className="text-secondary fs-4 bi bi-trash-fill"></i></button>
                        </div>

                      </div>
                    </li>

                  ))
                }



              </ul>
            )
          }


        </div>

        <div className='col-md-4'>
          <ul className='list-group'>
            <li className='list-group-item'>
              <h3>
                Subtotal ({cartItems.reduce((a,b)=> a + b.quantity ,0)} items ) : 
                ${cartItems.reduce((a,b)=> a + b.price * b.quantity , 0)} 
              </h3>
            </li>
            <li className='list-group-item'>
              <button onClick={checkoutHandler}  className={`btn btn-warning w-100 ${cartItems.length === 0 && 'disabled'}`}>
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>

      </div>



    </>
  )
}

export default CartPage