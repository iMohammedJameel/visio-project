import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/api'

const FALLBACK_IMAGES = [
  '/assets/images/1.png',
  '/assets/images/2.png',
  '/assets/images/3.png',
  '/assets/images/4.png',
  '/assets/images/5.png',
  '/assets/images/C1.png',
]

function getImageSrc(product, index) {
  if (product.image && !product.image.includes('default-product')) {
    return `http://localhost:4000/${product.image}`
  }
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

function ProductCard({ product, index }) {
  const imgSrc = getImageSrc(product, index)

  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
      <div
        className="card h-100 border-0 rounded-3 overflow-hidden"
        style={{ transition: 'box-shadow .25s,transform .25s', backgroundColor: 'transparent' }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,.1)'
          e.currentTarget.style.transform = 'translateY(-3px)'
          const btn = e.currentTarget.querySelector('.add-to-cart-btn')
          if (btn) btn.style.opacity = '1'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'none'
          const btn = e.currentTarget.querySelector('.add-to-cart-btn')
          if (btn) btn.style.opacity = '0'
        }}>

        {/* Image Box */}
        <div
          className="position-relative d-flex align-items-center justify-content-center rounded-3"
          style={{ backgroundColor: '#F3F5F7', height: 240 }}>
          <img
            src={imgSrc}
            alt={product.name}
            onError={e => { e.target.onerror=null; e.target.src=FALLBACK_IMAGES[index % FALLBACK_IMAGES.length] }}
            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
          />
          <button
            className="add-to-cart-btn btn btn-dark position-absolute bottom-0 start-0 end-0 mx-2 mb-2 fw-semibold"
            style={{ fontSize: 12, opacity: 0, transition: 'opacity .25s' }}
            onClick={e => e.preventDefault()}>
            Add to cart
          </button>
        </div>

        {/* Card Body */}
        <div className="px-1 pt-2 pb-1" style={{ backgroundColor: '#fff' }}>
          <div className="stars small mb-0">★★★★★</div>
          <div className="fw-bold small mb-0" style={{ lineHeight: 1.3 }}>{product.name}</div>
          <div className="fw-bold">${product.price.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  )
}

const DOTS = [0, 1, 2]

function FeaturedSection() {
  const scrollRef = useRef(null)
  const [active, setActive] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts(1, 6)
      .then(res => setProducts(res.data.data.products))
      .catch(err => console.error('Products fetch error:', err))
      .finally(() => setLoading(false))
  }, [])

  const scroll = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: index * 220, behavior: 'smooth' })
      setActive(index)
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="font-playfair fw-bold mb-0">Featured</h2>
          <div className="d-flex gap-2 align-items-center">
            {DOTS.map(i => (
              <div
                key={i}
                onClick={() => scroll(i)}
                style={{
                  width:           i === active ? 10 : 7,
                  height:          i === active ? 10 : 7,
                  borderRadius:    '50%',
                  backgroundColor: i === active ? '#000' : 'transparent',
                  border:          i === active ? '2px solid rgba(0,0,0,0.2)' : '1.5px solid #aaa',
                  outline:         i === active ? '3px solid rgba(0,0,0,0.12)' : 'none',
                  cursor:          'pointer',
                  transition:      'all .2s',
                }}
              />
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status"></div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="d-flex gap-3 pb-2"
            style={{ overflowX: 'auto', flexWrap: 'nowrap', scrollbarWidth: 'none', msOverflowStyle: 'none', overflow: 'hidden' }}>
            {products.map((p, i) => (
              <div key={p._id} style={{ minWidth: 200, maxWidth: 200 }}>
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedSection
