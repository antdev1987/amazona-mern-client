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

    ]
  },
])


function App() {

  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  )
}

export default App
