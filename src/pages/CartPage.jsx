import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const SHIP = [
  { id:'free',    label:'Free shipping',   price:0,  display:'$0.00' },
  { id:'express', label:'Express shipping', price:15, display:'+$15.00' },
  { id:'pickup',  label:'Pick Up',         price:0,  display:'%21.00' },
]

function CartPage() {
  const { cartItems, removeItem, updateQty } = useCart()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState('free')
  const [coupon,   setCoupon]   = useState('')
  const subtotal = cartItems.reduce((s,i)=>s+i.price*i.qty,0)
  const shipCost = SHIP.find(o=>o.id===shipping)?.price??0
  const total    = subtotal+shipCost

  const Steps = () => (
    <div className="d-flex align-items-center justify-content-center gap-0 mb-5">
      {[{n:1,l:'Shopping cart',active:true},{n:2,l:'Checkout details'},{n:3,l:'Order complete'}].map((s,i,arr)=>(
        <React.Fragment key={s.n}>
          <div className={`d-flex align-items-center gap-2 ${s.active?'opacity-100':'opacity-50'}`}>
            <span className={`step-num ${s.active?'bg-dark text-white':'bg-secondary text-white'}`}>{s.n}</span>
            <span className={`small fw-medium ${s.active?'text-dark':'text-muted'}`}>{s.l}</span>
          </div>
          {i<arr.length-1 && <div className="step-line bg-secondary bg-opacity-25 mx-3"/>}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="py-5">
      <div className="container">
        <h1 className="font-playfair fw-bold text-center mb-4" style={{fontSize:48}}>Cart</h1>
        <Steps/>

        <div className="row g-4">
          {/* Left */}
          <div className="col-lg-8">
            {/* Table head */}
            <div className="row d-none d-md-flex text-muted small text-uppercase fw-semibold pb-2 border-bottom">
              <div className="col-6">Product</div>
              <div className="col-2 text-center">Quantity</div>
              <div className="col-2 text-center">Price</div>
              <div className="col-2 text-center">Subtotal</div>
            </div>

            {cartItems.length===0 ? (
              <div className="text-center text-muted py-5">
                <i className="bi bi-bag fs-1 d-block mb-3"></i>
                <p>Your cart is empty</p>
              </div>
            ) : cartItems.map(item=>(
              <div key={item.id} className="row align-items-center py-3 border-bottom g-2">
                <div className="col-12 col-md-6 d-flex align-items-center gap-3">
                  <div className="table-img"><img src={item.image} alt={item.name}/></div>
                  <div>
                    <div className="fw-semibold">{item.name}</div>
                    <div className="text-muted small">Color: {item.color}</div>
                    <button className="btn btn-link text-muted p-0 small" onClick={()=>removeItem(item.id)}>
                      <i className="bi bi-x"></i> Remove
                    </button>
                  </div>
                </div>
                <div className="col-6 col-md-2 d-flex justify-content-md-center">
                  <div className="qty-control">
                    <button onClick={()=>updateQty(item.id,item.qty-1)} disabled={item.qty<=1}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                  </div>
                </div>
                <div className="col-6 col-md-2 text-md-center small">${item.price.toFixed(2)}</div>
                <div className="col-6 col-md-2 text-md-center fw-bold">${(item.price*item.qty).toFixed(2)}</div>
              </div>
            ))}

            {/* Coupon */}
            <div className="mt-4">
              <h5 className="fw-bold mb-1">Have a coupon?</h5>
              <p className="text-muted small mb-3">Add your code for an instant cart discount</p>
              <div className="input-group" style={{maxWidth:420}}>
                <span className="input-group-text bg-white"><i className="bi bi-tag text-muted"></i></span>
                <input className="form-control" placeholder="Coupon Code" value={coupon} onChange={e=>setCoupon(e.target.value)}/>
                <button className="btn btn-dark px-4">Apply</button>
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="col-lg-4">
            <div className="border rounded-3 p-4">
              <h5 className="fw-bold mb-3">Cart summary</h5>
              {SHIP.map(opt=>(
                <label key={opt.id} className={`d-flex align-items-center gap-3 border rounded-3 p-3 mb-2 cursor-pointer ${shipping===opt.id?'border-dark bg-light':''}`} style={{cursor:'pointer'}}>
                  <input type="radio" name="ship" value={opt.id} checked={shipping===opt.id} onChange={()=>setShipping(opt.id)} className="form-check-input mt-0"/>
                  <span className="flex-grow-1 small fw-medium">{opt.label}</span>
                  <span className="fw-semibold small">{opt.display}</span>
                </label>
              ))}
              <div className="d-flex justify-content-between text-muted small pt-3 border-top mt-2">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 py-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-dark w-100 py-3 fw-semibold" onClick={()=>navigate('/checkout')}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartPage
