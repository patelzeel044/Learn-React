import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import {store} from './store/store.jsx'
import { Provider } from 'react-redux'
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Products />} />
      <Route path='cart' element={<Cart />} />
    </Route>
 )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  </React.StrictMode>,
)
