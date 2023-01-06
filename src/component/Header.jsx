import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import useStore from '../context/StoreProvider'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { state, dispatch: ctxDispatch } = useStore()
  const { cart, userInfo } = state
  
  const navigate = useNavigate()


  const handleOut = (e) => {
    ctxDispatch({ type: 'user signout' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('paymentMethod');
    navigate('/signin')
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
        <ToastContainer />
      <header className=''>
        <nav className='navbar navbar-expand bg-body-tertiary container-lg '>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='text-decoration-none' to='/' >Amazona</Link>
              </li>

              <li className='nav-item'>
                <Link className='ms-2 position-relative text-decoration-none' to='/cart' >
                  Cart

                  {
                    cart.cartItems.length > 0 && (
                      <span className="position-absolute  top-0 start-100  badge rounded-pill bg-danger">
                        {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                        <span className="visually-hidden">unread messages</span>
                      </span>

                    )
                  }
                </Link>
              </li>

              <li className='nav-item ms-5'>

                {
                  userInfo ? (

                    <DropdownButton
                      align="end"
                      title={userInfo.name}
                      id="dropdown-menu-align-end"
                      variant="secondary"

                    >
                      <Dropdown.Item href='/profile' eventKey="1">
                        {/* <Link to='/profile' className='text-secondary text-decoration-none'>User Profile</Link> */}
                        user Profile
                      </Dropdown.Item>
                      <Dropdown.Item hre='/orderhistory' eventKey="2">
                        Order History
                        {/* <Link to='/orderhistory' className='text-secondary text-decoration-none'>Order History</Link> */}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleOut} eventKey="4">
                        Sign Out
                        {/* <Link onClick={handleOut} className='text-secondary text-decoration-none' to='#signout'>Sign Out</Link> */}
                      </Dropdown.Item>
                    </DropdownButton>
                  ) : (
                    <Link to='/signin'>Sign In</Link>
                  )
                }


              </li>
            </ul>

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