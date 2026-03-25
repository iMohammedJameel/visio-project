import React from 'react'
import { articles } from '../api/products.js'

function ArticlesSection() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="font-playfair fw-bold mb-0">Latest Articles</h2>
          <button className="btn btn-link text-dark fw-semibold small text-decoration-none p-0" style={{borderBottom:'1px solid #000', borderRadius:0}}>View More →</button>
        </div>
        <div className="row g-4">
          {articles.map(a=>(
            <div key={a.id} className="col-md-4">
              <div className="card border-0 h-100" style={{cursor:'pointer',transition:'transform .25s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <div style={{height:220,overflow:'hidden',borderRadius:10}}>
                  <img src={a.image} alt={a.title} className="w-100 h-100" style={{objectFit:'cover',objectPosition: a.id===2 ? 'center 30%' : 'center',transition:'transform .3s'}}/>
                </div>
                <div className="pt-3">
                  <h6 className="fw-bold mb-2">{a.title}</h6>
                  <button className="btn btn-link text-dark fw-semibold small text-decoration-none p-0" style={{borderBottom:'1px solid #000', borderRadius:0}}>Read More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default ArticlesSection
