import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/api'

function SignUp() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.name) errs.name = 'Name is required'
    else if (form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters'
    if (!form.email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setValidationErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setValidationErrors(errs); return }
    setLoading(true)
    setError(null)
    try {
      const res = await registerUser(form)
      if (res.status === 201) navigate('/login')
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column flex-md-row">

      {/* Image */}
      <div className="col-12 col-md-6 p-3 p-md-4" style={{ minHeight: 300 }}>
        <div className="position-relative h-100" style={{ minHeight: 300 }}>
          <img
            src="/assets/images/login-img.jpg"
            alt="Interior"
            className="w-100 h-100"
            style={{ objectFit: 'cover', borderRadius: 24, display: 'block', minHeight: 300 }}
          />
          <span className="position-absolute fw-bold text-white fs-5"
            style={{ top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2, whiteSpace: 'nowrap' }}>
            VisioCreate
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5">
        <div style={{ width: '100%', maxWidth: 420 }}>

          <h1 className="fw-bold mb-2" style={{ fontSize: 42 }}>Sign Up</h1>
          <p className="text-muted mb-4 small">
            Already have an account?{' '}
            <Link to="/login" className="text-success fw-semibold text-decoration-none">Sign In</Link>
          </p>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4 border-bottom pb-2">
              <input
                className="form-control border-0 p-0 shadow-none"
                placeholder="Your full name"
                type="text"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
              />
              {validationErrors.name && <div className="text-danger" style={{ fontSize: 12 }}>{validationErrors.name}</div>}
            </div>

            {/* Email */}
            <div className="mb-4 border-bottom pb-2">
              <input
                className="form-control border-0 p-0 shadow-none"
                placeholder="Your email address"
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
              />
              {validationErrors.email && <div className="text-danger" style={{ fontSize: 12 }}>{validationErrors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-4 border-bottom pb-2 position-relative">
              <input
                type={show ? 'text' : 'password'}
                className="form-control border-0 p-0 shadow-none pe-5"
                placeholder="Password"
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-0 p-0 text-muted"
                onClick={() => setShow(!show)}>
                <i className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
              {validationErrors.password && <div className="text-danger" style={{ fontSize: 12 }}>{validationErrors.password}</div>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-100 py-3 fw-semibold text-white rounded-3"
              style={{ background: '#AFD876' }}
              disabled={loading}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Creating account...</>
                : 'Sign Up'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
