import data from './data.js'

import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Header from './component/Header.jsx'
import ProductPage from './pages/ProductPage.jsx'
import {StoreProvider} from './context/StoreProvider.jsx'
import CartPage from './pages/CartPage.jsx'
import SignInPage from './pages/SignInPage.jsx'


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
        path:'cart',
        element:<CartPage />
      },
      {
        path:'signin',
        element:<SignInPage />
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
