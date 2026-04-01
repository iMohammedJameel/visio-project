import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import ProductPage from '../pages/ProductPage.jsx'
import CartPage from '../pages/CartPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import OrderComplete from '../pages/OrderComplete.jsx'
import MyAccount from '../pages/MyAccount.jsx'
import Shop from '../pages/Shop.jsx'

import SignUp from '../pages/SignUp.jsx'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-complete" element={<OrderComplete />} />
          <Route path="account" element={<MyAccount />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
