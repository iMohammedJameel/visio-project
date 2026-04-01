import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProducts } from '../api/api'
import Newsletter from '../components/Newsletter'

const CATEGORIES = ['All Rooms', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Dinning', 'Outdoor']
const PRICE_RANGES = [
  { label: 'All Price', min: 0, max: Infinity },
  { label: '$0.00 - 99.99', min: 0, max: 99.99 },
  { label: '$100.00 - 199.99', min: 100, max: 199.99 },
  { label: '$200.00 - 299.99', min: 200, max: 299.99 },
  { label: '$300.00 - 399.99', min: 300, max: 399.99 },
  { label: '$400.00+', min: 400, max: Infinity },
]
const PAGE_SIZE = 9

const Stars = () => (
  <span style={{ color: '#222', fontSize: 13 }}>{'★★★★★'}</span>
)

function ProductCard({ p, layout, onAddToCart }) {
  const [hovered, setHovered] = useState(false)
  const [wished, setWished] = useState(false)
  const imgSrc = p.image ? `http://localhost:4000/${p.image}` : '/assets/images/C1.png'
  const fallbackImages = ['/assets/images/C1.png','/assets/images/C2.png','/assets/images/C3.png','/assets/images/C4.png','/assets/images/C5.png']

  if (layout === 'list') {
    return (
      <div className="d-flex border rounded-3 overflow-hidden bg-white mb-3" style={{ minHeight: 160 }}>
        <div style={{ width: 160, minWidth: 160, background: '#f5f5f5', position: 'relative' }}>
          {p.isNew && <span className="badge text-dark position-absolute" style={{ top: 10, left: 10, background: '#fff', border: '1px solid #eee', fontSize: 11 }}>NEW</span>}
          {p.oldPrice && <span className="badge position-absolute" style={{ top: 30, left: 10, background: '#4CAF50', fontSize: 11 }}>-50%</span>}
          <img src={imgSrc} alt={p.name} onError={e => { e.target.onerror=null; e.target.src='/assets/images/C1.png' }} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} />
        </div>
        <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <Stars />
            <div className="fw-semibold mt-1">{p.name}</div>
            <div className="d-flex gap-2 align-items-center mt-1">
              <span className="fw-bold">${p.price.toFixed(2)}</span>
              {p.oldPrice && <span className="text-muted text-decoration-line-through small">${p.oldPrice.toFixed(2)}</span>}
            </div>
            {p.description && <p className="text-muted small mt-2 mb-0" style={{ fontSize: 12 }}>{p.description}</p>}
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-dark btn-sm px-4" onClick={() => onAddToCart(p)}>Add to cart</button>
            <button className="btn btn-link btn-sm text-dark text-decoration-none p-0" onClick={() => setWished(w => !w)}>
              <i className={`bi bi-heart${wished ? '-fill text-danger' : ''} me-1`}></i>Wishlist
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'list2') {
    return (
      <div className="col-12 col-md-6">
        <div className="d-flex border rounded-3 overflow-hidden bg-white mb-3" style={{ minHeight: 140 }}>
          <div style={{ width: 130, minWidth: 130, background: '#f5f5f5', position: 'relative' }}>
            {p.isNew && <span className="badge text-dark position-absolute" style={{ top: 8, left: 8, background: '#fff', border: '1px solid #eee', fontSize: 10 }}>NEW</span>}
            {p.oldPrice && <span className="badge position-absolute" style={{ top: 26, left: 8, background: '#4CAF50', fontSize: 10 }}>-50%</span>}
            <img src={imgSrc} alt={p.name} onError={e => { e.target.onerror=null; e.target.src='/assets/images/C1.png' }} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
          </div>
          <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
            <div>
              <Stars />
              <div className="fw-semibold small mt-1">{p.name}</div>
              <div className="d-flex gap-2 align-items-center mt-1">
                <span className="fw-bold small">${p.price.toFixed(2)}</span>
                {p.oldPrice && <span className="text-muted text-decoration-line-through" style={{ fontSize: 11 }}>${p.oldPrice.toFixed(2)}</span>}
              </div>
            </div>
            <button className="btn btn-dark btn-sm mt-2" style={{ fontSize: 11 }} onClick={() => onAddToCart(p)}>Add to cart</button>
          </div>
        </div>
      </div>
    )
  }

  // grid (3 or 4 cols)
  return (
    <div
      className="position-relative rounded-3 overflow-hidden bg-white"
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ background: '#f5f5f5', position: 'relative', aspectRatio: '1/1' }}>
        {p.isNew && (
          <span className="badge text-dark position-absolute" style={{ top: 10, left: 10, background: '#fff', border: '1px solid #eee', fontSize: 11, zIndex: 2 }}>NEW</span>
        )}
        {p.oldPrice && (
          <span className="badge position-absolute" style={{ top: p.isNew ? 32 : 10, left: 10, background: '#4CAF50', fontSize: 11, zIndex: 2 }}>-50%</span>
        )}
        <button
          className="btn btn-link position-absolute text-dark p-0"
          style={{ top: 10, right: 10, zIndex: 2 }}
          onClick={() => setWished(w => !w)}
        >
          <i className={`bi bi-heart${wished ? '-fill text-danger' : ''}`} style={{ fontSize: 16 }}></i>
        </button>
        <img src={imgSrc} alt={p.name} onError={e => { e.target.onerror=null; e.target.src='/assets/images/C1.png' }} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
        {hovered && (
          <button
            className="btn btn-dark position-absolute bottom-0 start-0"
            style={{ borderRadius: 8, fontSize: 13, margin: 8, width: 'calc(100% - 16px)' }}
            onClick={() => onAddToCart(p)}
          >
            Add to cart
          </button>
        )}
      </div>
      <div className="p-2 pb-3">
        <Stars />
        <div className="fw-semibold small mt-1">{p.name}</div>
        <div className="d-flex gap-2 align-items-center mt-1">
          <span className="fw-bold small">${p.price.toFixed(2)}</span>
          {p.oldPrice && <span className="text-muted text-decoration-line-through" style={{ fontSize: 12 }}>${p.oldPrice.toFixed(2)}</span>}
        </div>
      </div>
    </div>
  )
}

function Shop() {
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(() => {
    const c = searchParams.get('category')
    return c && CATEGORIES.includes(c) ? c : 'All Rooms'
  })
  const [priceIdx, setPriceIdx] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [layout, setLayout] = useState('grid3')
  const [page, setPage] = useState(1)
  const [catOpen, setCatOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts(1, 100)
      .then(res => setAllProducts(res.data.data.products))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const visible = allProducts.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < allProducts.length

  const { addItem, openCart } = useCart()
  function handleAddToCart(p) {
    const img = p.image ? `http://localhost:4000/${p.image}` : '/assets/images/C1.png'
    addItem({ id: p._id, name: p.name, price: p.price, image: img, color: p.categoryId?.name || 'Default' })
    openCart()
  }

  const gridClass = {
    grid4: 'col-6 col-md-3',
    grid3: 'col-6 col-md-4',
    list2: 'col-12',
    list: 'col-12',
  }[layout]

  return (
    <>
      {/* Hero Banner */}
      <div className="position-relative overflow-hidden" style={{ minHeight: 220 }}>
        <img
          src="https://www.pinnerhillgc.co.uk/images/thumbs/sites/pinnerhill/Home/1210x0/1/home-large-1.jpg"
          alt="Shop"
          style={{ width: '100%', height: 400, objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center"
          style={{ background: 'rgba(255,255,255,0.35)' }}>
          <div className="text-muted small mb-1">
            <Link to="/" className="text-muted text-decoration-none">Home</Link>
            <span className="mx-1">›</span>
            <span>Shop</span>
          </div>
          <h1 className="font-playfair fw-bold mb-1" style={{ fontSize: 'clamp(28px,5vw,48px)' }}>Shop Page</h1>
          <p className="text-muted mb-0 small">Let's design the place you always imagined.</p>
        </div>
      </div>

      <div className="container py-4">

        {/* Filter Bar - Desktop */}
        <div className="d-none d-md-flex align-items-center gap-3 mb-4">
          <i className="bi bi-sliders"></i>
          <span className="fw-semibold small">Filter</span>

          <div className="ms-3">
            <div className="text-muted small mb-1" style={{ fontSize: 11, letterSpacing: 1 }}>CATEGORIES</div>
            <select className="form-select form-select-sm" style={{ minWidth: 150 }} value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <div className="text-muted small mb-1" style={{ fontSize: 11, letterSpacing: 1 }}>PRICE</div>
            <select className="form-select form-select-sm" style={{ minWidth: 160 }} value={priceIdx} onChange={e => { setPriceIdx(+e.target.value); setPage(1) }}>
              {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>

          <div className="ms-auto d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{ width: 130 }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
            {[
              { key: 'grid4', icon: 'bi-grid' },
              { key: 'grid3', icon: 'bi-grid-3x3-gap' },
              { key: 'list2', icon: 'bi-layout-split' },
              { key: 'list', icon: 'bi-list-ul' },
            ].map(({ key, icon }) => (
              <button key={key} className={`btn btn-sm ${layout === key ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setLayout(key)}>
                <i className={`bi ${icon}`}></i>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar - Mobile */}
        <div className="d-md-none mb-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-sliders"></i>
              <span className="fw-semibold small">Filter</span>
            </div>
            <div className="d-flex gap-2">
              <button className={`btn btn-sm ${layout === 'grid3' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setLayout('grid3')}><i className="bi bi-layout-split"></i></button>
              <button className={`btn btn-sm ${layout === 'list' ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setLayout('list')}><i className="bi bi-list-ul"></i></button>
            </div>
          </div>

          {/* Category dropdown mobile */}
          <div className="mb-2">
            <div className="text-muted small mb-1" style={{ fontSize: 11, letterSpacing: 1 }}>CATEGORIES</div>
            <div className="position-relative">
              <button className="btn btn-outline-secondary btn-sm w-100 d-flex justify-content-between align-items-center" onClick={() => setCatOpen(o => !o)}>
                {category} <i className="bi bi-chevron-down"></i>
              </button>
              {catOpen && (
                <div className="position-absolute bg-white border rounded shadow-sm w-100" style={{ zIndex: 100 }}>
                  {CATEGORIES.map(c => (
                    <div key={c} className={`px-3 py-2 small ${category === c ? 'fw-bold' : ''}`} style={{ cursor: 'pointer' }}
                      onClick={() => { setCategory(c); setCatOpen(false); setPage(1) }}>{c}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Price dropdown mobile */}
          <div className="mb-3">
            <div className="text-muted small mb-1" style={{ fontSize: 11, letterSpacing: 1 }}>PRICE</div>
            <div className="position-relative">
              <button className="btn btn-outline-secondary btn-sm w-100 d-flex justify-content-between align-items-center" onClick={() => setPriceOpen(o => !o)}>
                {PRICE_RANGES[priceIdx].label} <i className="bi bi-chevron-down"></i>
              </button>
              {priceOpen && (
                <div className="position-absolute bg-white border rounded shadow-sm w-100" style={{ zIndex: 100 }}>
                  {PRICE_RANGES.map((r, i) => (
                    <div key={i} className={`px-3 py-2 small ${priceIdx === i ? 'fw-bold' : ''}`} style={{ cursor: 'pointer' }}
                      onClick={() => { setPriceIdx(i); setPriceOpen(false); setPage(1) }}>{r.label}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <span className="fw-semibold small">{category === 'All Rooms' ? 'All Products' : category}</span>
            <select className="form-select form-select-sm" style={{ width: 130 }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Category title - desktop */}
        <div className="d-none d-md-block mb-3">
          <span className="fw-semibold">{category === 'All Rooms' ? 'All Products' : category}</span>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-secondary" role="status"></div></div>
        ) : layout === 'list' ? (
          <div>
            {visible.map(p => <ProductCard key={p._id} p={p} layout="list" onAddToCart={handleAddToCart} />)}
          </div>
        ) : layout === 'list2' ? (
          <div className="row g-3">
            {visible.map(p => <ProductCard key={p._id} p={p} layout="list2" onAddToCart={handleAddToCart} />)}
          </div>
        ) : (
          <div className={`row g-3`}>
            {visible.map(p => (
              <div key={p._id} className={gridClass}>
                <ProductCard p={p} layout="grid" onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <div className="text-center mt-5">
            <button className="btn btn-outline-dark rounded-pill px-5" onClick={() => setPage(pg => pg + 1)}>
              Show more
            </button>
          </div>
        )}
      </div>

      <Newsletter />
    </>
  )
}

export default Shop
