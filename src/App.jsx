import data from './data.js'

import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Header from './component/Header.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { StoreProvider } from './context/StoreProvider.jsx'
import CartPage from './pages/CartPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import Unathorized from './component/Unathorized.jsx'
import ShippingAddressPage from './pages/ShippingAddressPage.jsx'
import PrivateRoutes from './component/PrivateRoutes.jsx'
import SignupPage from './pages/SignupPage.jsx'
import PaymentMethodPage from './pages/PaymentMethodPage.jsx'
import PlacerOrderPage from './pages/PlacerOrderPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'product/:slug',
        element: <ProductPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },

      {
        path: 'signin',
        element:
          <Unathorized>
            <SignInPage />
          </Unathorized>
      },

      {
        path:'signup',
        element:<SignupPage />
      },

      {
        path: 'shipping',
        element:
          <PrivateRoutes>
            <ShippingAddressPage />
          </PrivateRoutes>
      },

      {
        path: 'payment',
        element:
          <PrivateRoutes>
            <PaymentMethodPage />
          </PrivateRoutes>
      },

      {
        path: 'placeorder',
        element:
          <PrivateRoutes>
            <PlacerOrderPage />
          </PrivateRoutes>
      },

      {
        path:'order/:id',
        element:
        <PrivateRoutes>
          <OrderPage/>
        </PrivateRoutes>
      }

    ]
  },
])


function App() {

  return (
    <StoreProvider>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
      </PayPalScriptProvider>
    </StoreProvider>
  )
}

export default App
