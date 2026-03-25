import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../shared/Navbar.jsx'
import Footer from '../shared/Footer.jsx'
import Topbar from '../shared/Topbar.jsx'
import CartDrawer from '../shared/CartDrawer.jsx'

function MainLayout() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

export default MainLayout
