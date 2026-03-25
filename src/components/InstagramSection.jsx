import React from 'react'
import { instagramImages } from '../api/products.js'

function InstagramSection() {
  return (
    <section className="bg-white text-center">
      <div>
        <div className="py-5">
          <h6 className="text-muted text-uppercase" style={{letterSpacing:2,fontSize:12}}>Newsfeed</h6>
          <h2 className="font-playfair fw-bold mb-1">Instagram</h2>
          <p className="text-dark mb-1 small">@VisioCreate_official</p>
        </div>
        <div className="d-flex flex-wrap" style={{gap:0}}>
          {instagramImages.map((src,i)=>(
            <div key={i} style={{width:'16.666%', aspectRatio:'1/1', overflow:'hidden'}}>
              <img src={src} alt={`instagram ${i+1}`} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default InstagramSection
