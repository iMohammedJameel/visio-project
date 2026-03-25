import React, { useState } from 'react'

const paymentMethods = [
  { src: null, alt: 'Visa' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg', alt: 'Amex' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg', alt: 'Mastercard' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', alt: 'Stripe' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', alt: 'PayPal' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg', alt: 'Apple Pay' },
]

const sections = [
  { title: 'Pages', links: ['Home', 'Shop', 'Support', 'About', 'Contact Us'] },
  { title: 'Info', links: ['Privacy Policy', 'Return Policy', 'Support', 'FAQs'] },
  {
    title: 'Office', content: (
      <>
        <p className="text-white text-opacity-50 small mb-1">6775 Wallace Dr., Pittsburgh, PA 15235</p>
        <p className="text-white text-opacity-50 small mb-1">contact@visio.com</p>
        <p className="text-white text-opacity-50 small">Tel: 716-712-3727</p>
      </>
    )
  },
]

function Footer() {
  const [open, setOpen] = useState({})

  function toggle(title) {
    setOpen(prev => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <footer style={{backgroundColor:'#010101'}} className="text-white pt-5 pb-3">
      <div className="container">

        {/* Desktop */}
        <div className="row g-4 d-none d-md-flex text-start">
          <div className="col-lg-4 col-md-6">
            <div className="fw-bold fs-4 mb-3">VisioCreate.</div>
            <p className="text-white text-opacity-50 small mb-4">More than just a game.<br/>It's a lifestyle.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white text-opacity-50 fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white text-opacity-50 fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white text-opacity-50 fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-4" style={{fontSize:14}}>Page</h6>
            <ul className="list-unstyled">
              {['Home','Shop','Product','Articles','Contact Us'].map(l=>(
                <li key={l} className="mb-3"><a href="#" className="text-white text-opacity-50 small text-decoration-none">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-4" style={{fontSize:14}}>Info</h6>
            <ul className="list-unstyled">
              {['Shipping Policy','Return & Refund','Support','FAQs'].map(l=>(
                <li key={l} className="mb-3"><a href="#" className="text-white text-opacity-50 small text-decoration-none">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-4" style={{fontSize:14}}>Office</h6>
            <p className="text-white text-opacity-50 small mb-1">43111 Hai Trieu street,</p>
            <p className="text-white text-opacity-50 small mb-1">District 1, HCMC</p>
            <p className="text-white text-opacity-50 small mb-3">Vietnam</p>
            <p className="text-white text-opacity-50 small">84-756-3237</p>
          </div>
        </div>

        {/* Mobile */}
        <div className="d-md-none">
          <div className="font-playfair fw-black fs-4 mb-1">VisioCreate</div>
          <p className="text-white text-opacity-50 small mb-2">More than just a game. It's a lifestyle.</p>
          <div className="d-flex gap-3 mb-3">
            <a href="#" className="text-white text-opacity-50 fs-5"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-white text-opacity-50 fs-5"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-white text-opacity-50 fs-5"><i className="bi bi-twitter-x"></i></a>
          </div>

          {sections.map(s=>(
            <div key={s.title} className="border-top border-white border-opacity-10">
              <button className="btn w-100 text-white d-flex justify-content-between align-items-center py-3 px-0"
                style={{background:'none',border:'none',fontSize:13,fontWeight:600,letterSpacing:1,textTransform:'uppercase'}}
                onClick={()=>toggle(s.title)}>
                {s.title}
                <i className={`bi bi-chevron-${open[s.title]?'up':'down'}`} style={{fontSize:12}}></i>
              </button>
              {open[s.title] && (
                <div className="pb-3">
                  {s.content ? s.content : (
                    <ul className="list-unstyled mb-0">
                      {s.links.map(l=>(
                        <li key={l} className="mb-2"><a href="#" className="text-white text-opacity-50 small text-decoration-none">{l}</a></li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <hr className="border-white border-opacity-10 my-4"/>

        {/* Bottom bar - Desktop */}
        <div className="d-none d-md-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <small className="text-white text-opacity-50">Copyright © 2023 VisioCreate. All rights reserved</small>
            <span className="text-white text-opacity-25">|</span>
            <a href="#" className="text-white text-opacity-50 text-decoration-none small">Privacy Policy</a>
            <a href="#" className="text-white text-opacity-50 text-decoration-none small">Terms & Conditions</a>
          </div>
          <div className="d-flex gap-2">
            {paymentMethods.map(({ src, alt }) => (
              <div key={alt} className="bg-white rounded d-flex align-items-center justify-content-center px-2" style={{ height: 28, minWidth: 46 }}>
                {src
                  ? <img src={src} alt={alt} style={{ height: 16, objectFit: 'contain', maxWidth: 44 }} />
                  : <span style={{ fontWeight: 900, fontSize: 12, fontStyle: 'italic', color: '#1a1f71', letterSpacing: 1 }}>VISA</span>
                }
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar - Mobile */}
        <div className="d-md-none">
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
            {paymentMethods.map(({ src, alt }) => (
              <div key={alt} className="bg-white rounded d-flex align-items-center justify-content-center px-2" style={{ height: 32, minWidth: 52 }}>
                {src
                  ? <img src={src} alt={alt} style={{ height: 18, objectFit: 'contain', maxWidth: 48 }} />
                  : <span style={{ fontWeight: 900, fontSize: 14, fontStyle: 'italic', color: '#1a1f71', letterSpacing: 1 }}>VISA</span>
                }
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center gap-4 mb-3">
            <a href="#" className="text-white text-decoration-none small fw-semibold">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none small fw-semibold">Terms of Use</a>
          </div>
          <div className="text-center">
            <small className="text-white text-opacity-50">Copyright © 2023 VisioCreate. All rights reserved</small>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
