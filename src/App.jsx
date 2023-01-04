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
        path: 'shipping',
        element:
          <PrivateRoutes>
            <ShippingAddressPage />
          </PrivateRoutes>
      }
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
