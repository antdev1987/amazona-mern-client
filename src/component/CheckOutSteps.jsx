import React from 'react'

const CheckOutSteps = (props) => {

  return (
    <div className='row mb-2'>

        <div className={`col-3 border-3 border-bottom ${props.steps1 ? 'border-warning' : 'border-secondary'}`}>Sign-In</div>
        <div className={`col-3 border-3 border-bottom ${props.steps2 ? 'border-warning' : 'border-secondary'}`}>Shipping</div>
        <div className={`col-3 border-3 border-bottom ${props.steps3 ? 'border-warning' : 'border-secondary'}`}>Payment</div>
        <div className={`col-3 border-3 border-bottom ${props.steps4 ? 'border-warning' : 'border-secondary'}`}>Place Order</div>

    </div>
  )
}

export default CheckOutSteps