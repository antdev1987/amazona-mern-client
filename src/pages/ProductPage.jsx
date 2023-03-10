import axios from 'axios'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MessageBox from '../component/MessageBox'
import Rating from '../component/Rating'
import Spinner from '../component/Spinner'
import useStore from '../context/StoreProvider'
import getError from '../utils/getError'

const init = {
  loading: true,
  product: {},
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'fetch request':
      return { ...state, loading: true }
    case 'fetch success':
      return { ...state, loading: false, product: action.payload }
    case 'fetch failed':
      return { ...state, loading: false, error: action.payload }
    default: return {}
  }
}

const ProductPage = () => {

  const [{ loading, error, product }, dispatch] = useReducer(reducer, init)
  const { state, dispatch: cxtDispatch } = useStore()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {
      dispatch({ type: 'fetch request' })
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/products/slug/${slug}`
        const { data } = await axios(url)
        dispatch({ type: 'fetch success', payload: data })
      } catch (error) {
        dispatch({ type: 'fetch failed', payload: getError(error) })
      }
    }

    fetchData()

  }, [slug])

  const handleAddToCart = async () => {

    const existingItem = state.cart.cartItems.find((item) => item._id === product._id)

    const quantity = existingItem ? existingItem.quantity + 1 : 1
    const url = `http://localhost:4000/api/products/${product._id}`

    const { data } = await axios.get(url)

    if (data.stock < quantity) {
      window.alert('product is out of stock')
      return
    }

    cxtDispatch({ type: 'add to cart', payload: { ...product, quantity } })
    navigate('/cart')
  }

  return (
    loading ? (
      <Spinner />
    ) : error ? (
      <MessageBox modo='error'>{error}</MessageBox>
    ) : (

      <div className='row  h-100'>

        <div className='col-md-6'>
          <img src={product.image} className="img-fluid" alt="..." />
        </div>
        <div className='col-md-3'>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><h2>{product.name}</h2></li>
            <li className="list-group-item">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li className='list-group-item'>
              <span>Price: ${product.price}</span>
            </li>
            <li className="list-group-item">
              Descripton:
              <p>{product.description}</p>
            </li>

          </ul>
        </div>
        <div className='col-md-3'>
          <div className="card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className='row'>
                    <div className='col p-0'>Price:</div>
                    <div className='col p-0'>${product.price}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className='row'>
                    <div className='col-6 p-0'>Status:</div>
                    <div className='col-6 p-0'>
                      <span
                        className={product.countInStock > 0 ? 'badge text-bg-success' : 'badge text-bg-danger'}>
                        {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </li>
                {
                  product.countInStock > 0 && (
                    <li className="list-group-item p-0 py-2">
                      <button onClick={handleAddToCart} className='btn btn-warning w-100'>Add to Cart</button>
                    </li>

                  )
                }
              </ul>
            </div>
          </div>
        </div>

      </div>

    )
  )
}

export default ProductPage