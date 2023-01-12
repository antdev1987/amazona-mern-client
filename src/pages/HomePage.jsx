import React, { useReducer } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Product from '../component/Product'
import Spinner from '../component/Spinner'
import getError from '../utils/getError'
import MessageBox from '../component/MessageBox'
// import data from '../data'

function reducer(state, action) {
  switch (action.type) {
    case 'fetch request':
      return { ...state, loading: true }
    case 'fetch succes':
      return { ...state, loading: false, products: action.payload }
    case 'fetch fail':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

console.log('primero')
console.log(import.meta.env.VITE_API_BASE_URL)


const HomePage = () => {

  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: false,
    products: [],
    error: ''
  })

  useEffect(() => {

    const dataFetch = async () => {
      dispatch({ type: 'fetch request' })
      try {
        // const url = 'http://localhost:4000/api/products'
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`)
        dispatch({ type: 'fetch succes', payload: data })
        // setProducts(data)
      } catch (error) {
        dispatch({ type: 'fetch fail', payload: getError(error) })
      }
    }

    dataFetch()

  }, [])


  return (
    <>
      <h1>Featured Products</h1>
      <div className='products'>

        {
          loading ? (<Spinner />
          ) : error ? (<MessageBox>{error}</MessageBox>
          ) : (
            <div className='row'>
              {
                products.map((product) => (
                  <div key={product.slug} className='col-sm-4 col-lg-3 mb-3'>
                    <Product product={product} />
                  </div>
                ))
              }
            </div>
          )}

      </div>
    </>
  )
}

export default HomePage