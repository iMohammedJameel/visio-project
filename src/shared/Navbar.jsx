import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { toggleCart, totalCount } = useCart()
  const { isLoggedIn, logout, user } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleAccount = e => {
    e.preventDefault()
    navigate(isLoggedIn ? '/account' : '/login')
  }

  const handleLogout = e => {
    e.preventDefault()
    logout()
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('main-nav')
      if (el) el.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.08)' : 'none'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="main-nav" className="navbar navbar-expand-md bg-white border-bottom sticky-top" style={{ padding: '4px 0' }}>
      <div className="container">
        <Link to="/" className="navbar-brand font-playfair fw-black fs-4">VisioCreate.</Link>

        {/* Desktop icons */}
        <div className="d-none d-md-flex align-items-center gap-3 order-md-last">
          <a href="#" className="text-dark fs-5"><i className="bi bi-search"></i></a>

          {isLoggedIn ? (
            <div className="dropdown">
              <a href="#" className="text-dark fs-5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                style={{ textDecoration: 'none' }}>
                <i className="bi bi-person-check"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><span className="dropdown-item-text small text-muted">{user?.email}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={e => { e.preventDefault(); navigate('/account') }}>My Account</a></li>
                <li><a className="dropdown-item text-danger" href="#" onClick={handleLogout}>Log Out</a></li>
              </ul>
            </div>
          ) : (
            <a href="#" onClick={handleAccount} className="text-dark fs-5">
              <i className="bi bi-person"></i>
            </a>
          )}

          <a href="#" className="text-dark fs-5"><i className="bi bi-heart"></i></a>
          <a href="#" className="text-dark fs-5 position-relative" onClick={e => { e.preventDefault(); toggleCart() }}>
            <i className="bi bi-bag"></i>
            {totalCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: 10 }}>
                {totalCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile: icons + hamburger */}
        <div className="d-flex d-md-none align-items-center gap-3">
          <a href="#" className="text-dark fs-5 position-relative" onClick={e => { e.preventDefault(); toggleCart() }}>
            <i className="bi bi-bag"></i>
            {totalCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: 10 }}>
                {totalCount}
              </span>
            )}
          </a>
          <button className="navbar-toggler border-0 p-0" type="button" onClick={() => setMenuOpen(o => !o)}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="collapse navbar-collapse d-none d-md-flex" id="navMenu">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item"><Link to="/" className="nav-link px-3 fw-medium" style={{ fontSize: 14 }}>Home</Link></li>
            <li className="nav-item"><a href="#" className="nav-link px-3 fw-medium" style={{ fontSize: 14 }}>Shop <i className="bi bi-chevron-down" style={{ fontSize: 10 }}></i></a></li>
            <li className="nav-item"><a href="#" className="nav-link px-3 fw-medium" style={{ fontSize: 14 }}>Products <i className="bi bi-chevron-down" style={{ fontSize: 10 }}></i></a></li>
            <li className="nav-item"><a href="#" className="nav-link px-3 fw-medium" style={{ fontSize: 14 }}>Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Mobile full menu */}
      {menuOpen && (
        <div className="d-md-none bg-white border-top w-100"
          style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,.1)' }}>
          <div className="container py-3">
            <ul className="list-unstyled mb-3">
              {['Home', 'Shop', 'Products', 'Contact Us'].map(l => (
                <li key={l} className="border-bottom">
                  <a href="#" className="d-block py-3 text-dark text-decoration-none fw-medium" style={{ fontSize: 15 }}
                    onClick={() => setMenuOpen(false)}>{l}</a>
                </li>
              ))}
            </ul>
            <div className="d-flex gap-4 pt-2">
              <a href="#" className="text-dark fs-5"><i className="bi bi-search"></i></a>
              <a href="#" onClick={e => { handleAccount(e); setMenuOpen(false) }} className="text-dark fs-5">
                <i className={`bi ${isLoggedIn ? 'bi-person-check' : 'bi-person'}`}></i>
              </a>
              <a href="#" className="text-dark fs-5"><i className="bi bi-heart"></i></a>
              {isLoggedIn && (
                <a href="#" className="text-dark fs-5" onClick={e => { handleLogout(e); setMenuOpen(false) }}>
                  <i className="bi bi-box-arrow-right"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
