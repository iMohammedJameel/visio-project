import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../api/api'

const FALLBACK_IMAGES = [
  '/assets/images/C1.png',
  '/assets/images/C2.png',
  '/assets/images/C3.png',
  '/assets/images/2.png',
  '/assets/images/5.png',
  '/assets/images/1.png',
]

function getCategoryImage(cat, index) {
  if (cat.image) return `http://localhost:4000/${cat.image}`
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

function CategoriesSection() {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    getCategories(1, 6)
      .then(res => setCategories(res.data.data.categories))
      .catch(err => console.error('Categories fetch error:', err))
      .finally(() => setLoading(false))
  }, [])

  const CategoryCard = ({ cat, index }) => (
    <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="border-0 rounded-3 overflow-hidden text-center"
        style={{ cursor: 'pointer', transition: 'transform .25s, box-shadow .25s', backgroundColor: 'transparent' }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}>
        <div
          className="d-flex align-items-center justify-content-center rounded-3"
          style={{ backgroundColor: '#F3F5F7', height: 200 }}>
          <img
            src={getCategoryImage(cat, index)}
            alt={cat.name}
            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
          />
        </div>
        <div className="fw-medium mt-2">{cat.name}</div>
      </div>
    </Link>
  )

  if (loading) {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center py-5">
          <div className="spinner-border text-secondary" role="status"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="font-playfair fw-bold text-center mb-4">Shop by Categories</h2>

        {/* Desktop */}
        <div className="d-none d-md-grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {categories.map((cat, i) => <CategoryCard key={cat._id} cat={cat} index={i} />)}
        </div>

        {/* Mobile */}
        <div className="d-grid d-md-none gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {categories.map((cat, i) => <CategoryCard key={cat._id} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
