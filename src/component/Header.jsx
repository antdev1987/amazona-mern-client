import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import useStore from '../context/StoreProvider'

const Header = () => {
  const { state } = useStore()
  const { cart } = state
  // console.log(cart)
  return (
    <div className='d-flex flex-column min-vh-100'>
      <header className=''>
        <nav className='container-lg '>

          <div className=''>
            <Link className='text-decoration-none' to='/' >Amazona</Link>

            <Link className='ms-2 position-relative text-decoration-none' to='/cart' >
              Cart

              {
                cart.cartItems.length > 0 && (
                  <span className="position-absolute  top-0 start-100  badge rounded-pill bg-danger">
                    {cart.cartItems.reduce((a,b)=> a + b.quantity , 0 )}
                    <span className="visually-hidden">unread messages</span>
                  </span>

                )
              }
            </Link>
          </div>


        </nav>

      </header>

      <main className='container-lg border border-danger flex-fill'>
        <Outlet />
      </main>

      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
  )
}

export default Header