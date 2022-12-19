import React, { useReducer } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
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


const HomePage = () => {

  // const [products, setProducts] = useState([])

  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: false,
    products: [],
    error: ''
  })

  useEffect(() => {

    const dataFetch = async () => {
      dispatch({ type: 'fetch request' })
      try {
        const url = 'http://localhost:4000/api/products'
        const { data } = await axios.get(url)
        dispatch({ type: 'fetch succes', payload: data })
        // setProducts(data)
      } catch (error) {
        dispatch({ type: 'fetch fail', payload: error.message })
        console.log(error)
      }
    }

    dataFetch()

  }, [])


  return (
    <>
      <h1>Featured Products</h1>
      <div className='products'>

        {
        loading ? <>Loading...</> :
        error ? <div>{error}</div>:
        products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage