import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function OrderComplete() {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  const order = {
    code: '#0123_45678',
    date: 'Mar 19, 2026',
    total: '$1,345.00',
    payment: 'Credit Card'
  }

  const steps = [
    { n: 1, l: 'Shopping cart', done: true },
    { n: 2, l: 'Checkout details', done: true },
    { n: 3, l: 'Order complete', active: true }
  ]

  const demos = [
    '/assets/images/1.png',
    '/assets/images/2.png',
    '/assets/images/3.png',
  ]
  const thumbs = cartItems.length>0 ? cartItems : demos.map((img,i)=>({id:i,image:img,qty:2}))

  return (
    <div className="py-5">
      <div className="container">
        <h1 className="font-playfair fw-bold text-center mb-4" style={{fontSize:48}}>Complete!</h1>

        {/* Steps */}
        <div className="d-flex align-items-center justify-content-center gap-0 mb-5">
          {steps.map((s,i,arr)=>(
            <React.Fragment key={s.n}>
              <div className={`d-flex align-items-center gap-2`}>
                <span className={`step-num text-white ${s.done?'bg-success':s.active?'bg-dark':'bg-secondary'}`}>
                  {s.done?<i className="bi bi-check-lg"></i>:s.n}
                </span>
                <span className={`small fw-semibold ${s.done?'text-success':s.active?'text-dark':'text-muted'}`}>{s.l}</span>
              </div>
              {i<arr.length-1 && <div className={`step-line mx-3 ${s.done?'bg-success':'bg-secondary bg-opacity-25'}`}/>}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="border rounded-4 p-5 mx-auto text-center" style={{maxWidth:560}}>
          <p className="text-muted mb-2">Thank you! 🎉</p>
          <h2 className="font-playfair fw-bold mb-4">Your order has been<br/>received</h2>

          {/* Thumbnails */}
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            {thumbs.map((item,i)=>(
              <div key={i} className="position-relative" style={{width:88,height:88}}>
                <img src={item.image} alt="" className="w-100 h-100 rounded-3" style={{objectFit:'cover'}}/>
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-dark" style={{fontSize:11}}>
                  {item.qty}
                </span>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="text-start border-top border-bottom py-3 mb-4">
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted small">Order code:</span>
              <span className="fw-semibold small">{order.code}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted small">Date:</span>
              <span className="fw-semibold small">{order.date}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted small">Total:</span>
              <span className="fw-semibold small">{order.total}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted small">Payment method:</span>
              <span className="fw-semibold small">{order.payment}</span>
            </div>
          </div>

          <button className="btn btn-dark rounded-pill px-5 py-3 fw-semibold" onClick={()=>navigate('/')}>
            Purchase history
          </button>
        </div>
      </div>
    </div>
  )
}
export default OrderComplete
