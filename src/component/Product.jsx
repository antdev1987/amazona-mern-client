import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';



const Product = ({ product }) => {
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
        <Button variant="warning">Add to cart</Button>
      </Card.Body>
    </Card>

  )
}

export default Product