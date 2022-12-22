import data from './data.js'

import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Header from './component/Header.jsx'
import ProductPage from './pages/ProductPage.jsx'
import {StoreProvider} from './context/StoreProvider.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'product/:slug',
        element: <ProductPage />
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
