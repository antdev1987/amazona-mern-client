import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import useStore from '../context/StoreProvider'
import axios from 'axios'



const Product = ({ product }) => {

  const { state, dispatch: cxtDispatch } = useStore()

  const handleAddToCart = async () => {

    const existingItem = state.cart.cartItems.find((item) => item._id === product._id)

    const quantity = existingItem ? existingItem.quantity + 1 : 1
    const url = `${import.meta.env.VITE_API_BASE_URL}/products/${product._id}`

    const { data } = await axios.get(url)

    if (data.stock < quantity) {
      window.alert('maximum that we have in stock')
      return
    }

    cxtDispatch({ type: 'add to cart', payload: { ...product, quantity } })
    // navigate('/cart')
  }

  return (

    <Card className="border border-2 border-primary">
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant='top' src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button onClick={handleAddToCart} disabled={product.countInStock === 0} variant="warning">Add to cart</Button>
      </Card.Body>
    </Card>

  )
}

export default Product