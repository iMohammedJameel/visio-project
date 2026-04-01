import React from 'react'

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-vh-100 d-flex flex-column flex-md-row">
      <div className="col-12 col-md-6 p-3 p-md-4" style={{ minHeight: 300 }}>
        <div className="position-relative h-100" style={{ minHeight: 300 }}>
          <img
            src="/assets/images/login-img.jpg"
            alt="Interior"
            className="w-100 h-100"
            style={{ objectFit: 'cover', borderRadius: 24, minHeight: 300 }}
          />
          <span className="position-absolute fw-bold text-white fs-5"
            style={{ top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2, whiteSpace: 'nowrap' }}>
            VisioCreate
          </span>
        </div>
      </div>

      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5">
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 className="fw-bold mb-2" style={{ fontSize: 42 }}>{title}</h1>
          <p className="text-muted mb-4 small">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
