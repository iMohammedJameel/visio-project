import React, { useState } from 'react'

const LEFT_IMG  = 'https://cdn.shopify.com/s/files/1/0564/7990/7898/files/sny-prox-performance.jpg?v=1733393310'
const RIGHT_IMG = 'https://img.freepik.com/free-photo/view-metallic-golf-club-with-ball_23-2150426483.jpg?w=360'

function Newsletter() {
  const [email, setEmail] = useState('')
  const handleSubmit = e => { e.preventDefault(); alert(`Subscribed: ${email}`); setEmail('') }
  return (
    <section style={{backgroundColor:'#010101', position:'relative', overflow:'hidden', minHeight:280}}>

      {/* Left Image - absolute */}
      <img src={LEFT_IMG} alt="" style={{position:'absolute', left:0, top:0, height:'100%', width:'40%', objectFit:'cover'}} />

      {/* Right Image - absolute */}
      <img src={RIGHT_IMG} alt="" style={{position:'absolute', right:0, top:0, height:'100%', width:'40%', objectFit:'contain'}} />

      {/* Center Content */}
      <div className="text-center px-4 py-4" style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:1, width:'100%'}}>
        <h2 className="font-playfair fw-bold text-white mb-1">Join Our Newsletter</h2>
        <p className="text-white mb-3 small" style={{opacity:.6}}>Sign up for deals, new products and promotions</p>
        <form className="d-flex justify-content-center" onSubmit={handleSubmit} style={{maxWidth:440, margin:'0 auto'}}>
          <div className="d-flex align-items-center border-bottom border-secondary w-100">
            <i className="bi bi-envelope text-white me-2" style={{opacity:.6}}></i>
            <input type="email" className="bg-transparent border-0 text-white small flex-grow-1"
              style={{outline:'none'}} placeholder="Email address"
              value={email} onChange={e=>setEmail(e.target.value)} required />
            <button type="submit" className="bg-transparent border-0 text-white fw-semibold small ms-3"
              style={{whiteSpace:'nowrap', letterSpacing:1}}>Signup</button>
          </div>
        </form>
      </div>

    </section>
  )
}
export default Newsletter
