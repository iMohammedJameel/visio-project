import React, { useState } from 'react'

function Topbar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="d-flex align-items-center justify-content-center position-relative text-dark py-1 fw-bold"
      style={{backgroundColor:'#AFD876', fontSize:12, letterSpacing:.5}}>
      🏌️ 30% off storewide — Limited time! 
      <button className="text-dark fw-bold ms-1 d-flex align-items-center gap-1 border-0 bg-transparent p-0" style={{borderBottom:'1.5px solid #000', cursor:'pointer'}}>
        Shop Now <i className="bi bi-arrow-right"></i>
      </button>
      <button
        onClick={() => setVisible(false)}
        className="position-absolute end-0 me-3 border-0 text-dark fw-bold d-flex align-items-center"
        style={{background:'transparent', fontSize:16, lineHeight:1, cursor:'pointer'}}>
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  )
}
export default Topbar