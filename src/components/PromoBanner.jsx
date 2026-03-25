import React, { useState, useEffect } from 'react'

function PromoBanner() {
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
    <section style={{backgroundColor:'#1a1a1a'}}>
      <div className="container-fluid px-0">
        <div className="row g-0 flex-column-reverse flex-md-row" style={{minHeight:200}}>

          {/* Left - Image */}
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/free-photo/view-golf-balls-with-other-paraphernalia_23-2150424606.jpg?semt=ais_rp_progressive&w=740&q=80"
              alt="Golf"
              className="w-100 h-100"
              style={{objectFit:'cover', display:'block'}}
            />
          </div>

          {/* Right - Content */}
          <div className="col-md-6 d-flex align-items-center px-5 py-4" style={{backgroundColor:'#1a1a1a'}}>
            <div>
              <small className="fw-bold text-uppercase mb-2 d-block" style={{color:'#4caf50', letterSpacing:3, fontSize:11}}>
                Limited Edition
              </small>
              <h2 className="fw-black text-white mb-1" style={{fontSize:32}}>Hurry up! 30% OFF</h2>
              <p className="text-white text-opacity-65 mb-3 small">Find clubs that are right for your game</p>

              <small className="text-white text-opacity-50 d-block mb-2">Offer expires in:</small>

              {/* Countdown */}
              <div className="d-flex gap-2 mb-4">
                <div className="text-center bg-white rounded-2 px-2 py-1" style={{ minWidth: 52 }}>
                  <span className="fw-bold text-dark d-block" style={{ fontSize: 22, lineHeight: 1 }}>{pad(time.d)}</span>
                  <span className="text-muted" style={{ fontSize: 9, textTransform: 'uppercase', marginTop: 2 }}>Days</span>
                </div>
                <div className="text-center bg-white rounded-2 px-2 py-1" style={{ minWidth: 52 }}>
                  <span className="fw-bold text-dark d-block" style={{ fontSize: 22, lineHeight: 1 }}>{pad(time.h)}</span>
                  <span className="text-muted" style={{ fontSize: 9, textTransform: 'uppercase', marginTop: 2 }}>Hours</span>
                </div>
                <div className="text-center bg-white rounded-2 px-2 py-1" style={{ minWidth: 52 }}>
                  <span className="fw-bold text-dark d-block" style={{ fontSize: 22, lineHeight: 1 }}>{pad(time.m)}</span>
                  <span className="text-muted" style={{ fontSize: 9, textTransform: 'uppercase', marginTop: 2 }}>Minutes</span>
                </div>
                <div className="text-center bg-white rounded-2 px-2 py-1" style={{ minWidth: 52 }}>
                  <span className="fw-bold text-dark d-block" style={{ fontSize: 22, lineHeight: 1 }}>{pad(time.s)}</span>
                  <span className="text-muted" style={{ fontSize: 9, textTransform: 'uppercase', marginTop: 2 }}>Seconds</span>
                </div>
              </div>

              <button className="btn px-4 py-2 fw-semibold text-dark rounded-2" style={{backgroundColor:'#4caf50'}}>Shop now</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
export default PromoBanner