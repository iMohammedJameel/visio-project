import React from 'react'

function HeroSection() {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="col-lg-6">
          <h1 className="fw-bold text-white lh-1 mb-3">
            <span className="d-block fw-bold mb-1" style={{fontSize:22}}>More than just a game.</span>
            <em className="fw-black" style={{fontSize:52, fontStyle:'italic'}}>It's a lifestyle.</em>
          </h1>
          <p className="text-white text-opacity-75 mb-4" style={{maxWidth:380,lineHeight:1.7}}>
            Whether you're just starting out, have played your whole life or you're a Tour pro — we have everything you need.
          </p>
          <button className="btn px-4 py-2 fw-semibold text-dark" style={{backgroundColor:'#AFD876'}}>Shopping Now</button>
        </div>
      </div>
    </section>
  )
}
export default HeroSection