import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { getProductById } from '../api/api'




const reviews = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Sofia Harvetz' : 'Nicolas Jensen',
  rating: 5,
  avatar: `https://i.pravatar.cc/48?img=${i + 10}`,
  text: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos.',
}))

function Stars({ rating, size = 14 }) {
  const stars = [1, 2, 3, 4, 5]

  function getStarIcon(i) {
    if (i <= Math.floor(rating)) return 'bi-star-fill'
    if (i - 0.5 <= rating) return 'bi-star-half'
    return 'bi-star'
  }

  return (
    <span className="stars" style={{ fontSize: size }}>
      {stars.map(i => (
        <i key={i} className={`bi ${getStarIcon(i)}`}></i>
      ))}
    </span>
  )
}

function Countdown() {
  const [time, setTime] = useState({ d: 2, h: 12, m: 45, s: 5 })

  useEffect(() => {
    let total = 2 * 86400 + 12 * 3600 + 45 * 60 + 5

    const timer = setInterval(() => {
      if (total <= 0) {
        clearInterval(timer)
        return
      }
      total--
      setTime({
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function pad(n) {
    return String(n).padStart(2, '0')
  }

  return (
    <div className="d-flex gap-2 mb-3">
      <div className="count-box text-center px-3 py-2 bg-light rounded-2" style={{ minWidth: 60 }}>
        <div className="fw-bold" style={{ fontSize: 22, color: '#1a1a1a', lineHeight: 1 }}>{pad(time.d)}</div>
        <div className="text-muted" style={{ fontSize: 10, textTransform: 'uppercase', marginTop: 3 }}>Days</div>
      </div>
      <div className="count-box text-center px-3 py-2 bg-light rounded-2" style={{ minWidth: 60 }}>
        <div className="fw-bold" style={{ fontSize: 22, color: '#1a1a1a', lineHeight: 1 }}>{pad(time.h)}</div>
        <div className="text-muted" style={{ fontSize: 10, textTransform: 'uppercase', marginTop: 3 }}>Hours</div>
      </div>
      <div className="count-box text-center px-3 py-2 bg-light rounded-2" style={{ minWidth: 60 }}>
        <div className="fw-bold" style={{ fontSize: 22, color: '#1a1a1a', lineHeight: 1 }}>{pad(time.m)}</div>
        <div className="text-muted" style={{ fontSize: 10, textTransform: 'uppercase', marginTop: 3 }}>Minutes</div>
      </div>
      <div className="count-box text-center px-3 py-2 bg-light rounded-2" style={{ minWidth: 60 }}>
        <div className="fw-bold" style={{ fontSize: 22, color: '#1a1a1a', lineHeight: 1 }}>{pad(time.s)}</div>
        <div className="text-muted" style={{ fontSize: 10, textTransform: 'uppercase', marginTop: 3 }}>Seconds</div>
      </div>
    </div>
  )
}

function ProductPage() {
  const { id } = useParams()
  const { addItem, openCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('reviews')
  const [wishlist, setWishlist] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProductById(id)
      .then(res => {
        setProduct(res.data.data.product)
        setActiveImg(0)
      })
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center text-muted">
        <i className="bi bi-exclamation-circle fs-1 d-block mb-3"></i>
        <p>{error || 'Product not found'}</p>
      </div>
    )
  }

  const mainImage = product.image && !product.image.includes('default-product')
    ? `http://localhost:4000/${product.image}`
    : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'

  const images = [mainImage, ...(product.images || [])]
  const colorImages = images.map((img, i) => ({ name: `View ${i + 1}`, image: img }))

  const handleAdd = () => {
    addItem({
      id: product._id,
      name: product.name,
      color: activeColor,
      price: product.price,
      qty,
      image: mainImage,
    })
    openCart()
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="border-bottom py-2 bg-white">
        <div className="container">
          <small className="text-muted">
            Home <i className="bi bi-chevron-right" style={{ fontSize: 10 }}></i>{' '}
            Shop <i className="bi bi-chevron-right" style={{ fontSize: 10 }}></i>{' '}
            {product.categoryId?.name && (
              <>{product.categoryId.name} <i className="bi bi-chevron-right" style={{ fontSize: 10 }}></i>{' '}</>
            )}
            <span className="text-dark fw-medium">{product.name}</span>
          </small>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-5">

          {/* LEFT - Images */}
          <div className="col-lg-5">
            <div className="pd-main-img position-relative mb-3">
              <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1" style={{ zIndex: 2 }}>
                <span className="badge" style={{ letterSpacing: 1, backgroundColor: '#fff', color: '#010101' }}>NEW</span>
              </div>
              <button
                className="btn btn-light btn-sm rounded-circle position-absolute start-0 top-50 translate-middle-y ms-2 shadow-sm"
                onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                style={{ zIndex: 2, width: 36, height: 36, padding: 0 }}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <img src={images[activeImg]} alt={product.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
              <button
                className="btn btn-light btn-sm rounded-circle position-absolute end-0 top-50 translate-middle-y me-2 shadow-sm"
                onClick={() => setActiveImg(i => (i + 1) % images.length)}
                style={{ zIndex: 2, width: 36, height: 36, padding: 0 }}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
            <div className="d-flex gap-2">
              {images.map((img, i) => (
                <div key={i} className={`pd-thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Info */}
          <div className="col-lg-7">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Stars rating={5} size={16} />
              <small className="text-muted">11 Reviews</small>
            </div>

            <h1 className="font-playfair fw-bold mb-3" style={{ fontSize: 36 }}>{product.name}</h1>
            <p className="text-muted mb-3" style={{ lineHeight: 1.7 }}>
              {product.description || 'A premium golf product built for performance and style.'}
            </p>

            <div className="d-flex align-items-baseline gap-3 mb-3">
              <span className="fw-bold fs-3">${product.price.toFixed(2)}</span>
            </div>

            <small className="text-muted d-block mb-2">Offer expires in:</small>
            <Countdown />

            {/* Category */}
            {product.categoryId?.name && (
              <div className="mb-3">
                <small className="text-uppercase text-muted fw-semibold d-block mb-1" style={{ letterSpacing: .5 }}>Category</small>
                <span className="fw-medium">{product.categoryId.name}</span>
              </div>
            )}

            {/* Color */}
            <div className="mb-4">
              <small className="text-uppercase text-muted fw-semibold d-block mb-1" style={{ letterSpacing: .5 }}>
                Choose Color <i className="bi bi-chevron-right" style={{ fontSize: 10 }}></i>
              </small>
              <div className="fw-medium mb-2">{colorImages[activeColor]?.name}</div>
              <div className="d-flex gap-2">
                {colorImages.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => { setActiveColor(i); setActiveImg(i) }}
                    style={{ cursor: 'pointer', width: 52, height: 52, borderRadius: 8, overflow: 'hidden', border: `2px solid ${activeColor === i ? '#212529' : 'transparent'}`, transition: 'border-color .2s,transform .15s', transform: activeColor === i ? 'scale(1.05)' : 'none' }}>
                    <img src={c.image} alt={c.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 mb-3">
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                className={`btn flex-grow-1 fw-semibold ${wishlist ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => setWishlist(w => !w)}>
                <i className={`bi ${wishlist ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>Wishlist
              </button>
            </div>
            <button className="btn btn-dark w-100 py-3 fw-semibold mb-3" onClick={handleAdd}>Add to Cart</button>

            {/* Meta */}
            <div className="text-muted small">
              <div className="mb-1">
                <span className="text-uppercase fw-semibold me-3" style={{ letterSpacing: .5, minWidth: 80, display: 'inline-block' }}>Added by</span>
                {product.createdBy?.name || 'Admin'}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-5">
            <li className="nav-item">
              <button
                className={`nav-link fw-medium ${activeTab === 'additionalinfo' ? 'active text-dark fw-semibold' : 'text-muted'}`}
                onClick={() => setActiveTab('additionalinfo')}>
                Additional Info
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-medium ${activeTab === 'questions' ? 'active text-dark fw-semibold' : 'text-muted'}`}
                onClick={() => setActiveTab('questions')}>
                Questions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-medium ${activeTab === 'reviews' ? 'active text-dark fw-semibold' : 'text-muted'}`}
                onClick={() => setActiveTab('reviews')}>
                Reviews
              </button>
            </li>
        </ul>

        {activeTab === 'reviews' && (
          <div className="pt-4">
            <h4 className="font-playfair fw-bold mb-4">Customer Reviews</h4>
            <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
              <div>
                <Stars rating={5} size={18} />
                <div className="text-muted small mt-1">11 Reviews</div>
                <div className="fw-medium small mt-1">{product.name}</div>
              </div>
              <div className="input-group" style={{ maxWidth: 420 }}>
                <input type="text" className="form-control" placeholder="Share your thoughts" />
                <button className="btn btn-dark px-4">Write Review</button>
              </div>
            </div>
            {reviews.map(r => (
              <div key={r.id} className="d-flex gap-3 py-4 border-bottom">
                <img src={r.avatar} alt={r.name} className="rounded-circle flex-shrink-0" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                <div>
                  <div className="fw-semibold mb-1">{r.name}</div>
                  <Stars rating={r.rating} size={13} />
                  <p className="text-muted small mt-2 mb-2" style={{ lineHeight: 1.7 }}>{r.text}</p>
                  <div className="d-flex gap-3">
                    <button className="btn btn-link text-muted p-0 small">Like</button>
                    <button className="btn btn-link text-muted p-0 small">Reply</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center py-4">
              <button className="btn btn-outline-secondary rounded-pill px-4">Load more</button>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="font-playfair fw-bold mb-2">Join Our Newsletter</h2>
          <p className="text-muted small mb-4">Sign up for deals, new products and promotions</p>
          <div className="d-flex justify-content-center border-bottom pb-1" style={{ maxWidth: 440, margin: '0 auto' }}>
            <i className="bi bi-envelope text-muted me-2 align-self-center"></i>
            <input type="email" className="form-control border-0 bg-transparent shadow-none p-0" placeholder="Email address" />
            <button className="btn btn-link text-dark fw-semibold p-0 text-decoration-none">Signup</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductPage
