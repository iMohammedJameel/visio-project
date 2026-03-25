import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const COUNTRIES = ['Egypt', 'United States', 'United Kingdom', 'Saudi Arabia', 'UAE', 'Germany', 'France', 'Canada', 'Australia']

function Field({ label, children, req }) {
  return (
    <div className="mb-3">
      <label className="text-uppercase text-muted fw-semibold d-block mb-1" style={{ fontSize: 11, letterSpacing: .5 }}>
        {label}{req && <span className="text-danger ms-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const StepsBar = ({current}) => {
  const steps = [{n:1,l:'Shopping cart'},{n:2,l:'Checkout details'},{n:3,l:'Order complete'}]
  return (
    <div className="d-flex align-items-center justify-content-center gap-0 mb-5">
      {steps.map((s,i,arr)=>(
        <React.Fragment key={s.n}>
          <div className={`d-flex align-items-center gap-2 ${s.n<=current?'opacity-100':'opacity-50'}`}>
            <span className={`step-num text-white ${s.n<current?'bg-success':s.n===current?'bg-dark':'bg-secondary'}`}>
              {s.n<current ? <i className="bi bi-check-lg"></i> : s.n}
            </span>
            <span className={`small fw-medium ${s.n<current?'text-success':s.n===current?'text-dark':'text-muted'}`}>{s.l}</span>
          </div>
          {i<arr.length-1 && <div className={`step-line mx-3 ${s.n<current?'bg-success':'bg-secondary bg-opacity-25'}`}/>}
        </React.Fragment>
      ))}
    </div>
  )
}

function CheckoutPage() {
  const { cartItems, updateQty, removeItem } = useCart()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('card')
  const [applied, setApplied] = useState(true)
  const [coupon,  setCoupon]  = useState('')
  const [diffBilling, setDiffBilling] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', street: '', country: '', city: '', state: '', zip: '', cardNumber: '', expiry: '', cvc: '' })

  function handleFormChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }
  const subtotal = cartItems.reduce((s,i)=>s+i.price*i.qty,0)
  const discount = applied?25:0
  const total    = subtotal-discount

return (
    <div className="py-5">
      <div className="container">
        <h1 className="font-playfair fw-bold text-center mb-4" style={{fontSize:48}}>Check Out</h1>
        <StepsBar current={2}/>

        <form onSubmit={e=>{e.preventDefault();navigate('/order-complete')}}>
          <div className="row g-4">

            {/* LEFT */}
            <div className="col-lg-7">
              {/* Contact */}
              <div className="border rounded-3 p-4 mb-4">
                <h5 className="fw-bold mb-4">Contact Information</h5>
                <div className="row g-3">
                  <div className="col-6"><Field label="First Name" req><input className="form-control" placeholder="First name" value={form.firstName} onChange={e => handleFormChange('firstName', e.target.value)} /></Field></div>
                  <div className="col-6"><Field label="Last Name" req><input className="form-control" placeholder="Last name" value={form.lastName} onChange={e => handleFormChange('lastName', e.target.value)} /></Field></div>
                </div>
                <Field label="Phone Number"><input className="form-control" placeholder="Phone number" type="tel" value={form.phone} onChange={e => handleFormChange('phone', e.target.value)} /></Field>
                <Field label="Email Address"><input className="form-control" placeholder="Your Email" type="email" value={form.email} onChange={e => handleFormChange('email', e.target.value)} /></Field>
              </div>

              {/* Shipping */}
              <div className="border rounded-3 p-4 mb-4">
                <h5 className="fw-bold mb-4">Shipping Address</h5>
                <Field label="Street Address" req><input className="form-control" placeholder="Street Address" value={form.street} onChange={e => handleFormChange('street', e.target.value)} required /></Field>
                <Field label="Country" req>
                  <select className="form-select" value={form.country} onChange={e => handleFormChange('country', e.target.value)} required>
                    <option value="">Country</option>
                    {COUNTRIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Town / City" req><input className="form-control" placeholder="Town / City" value={form.city} onChange={e => handleFormChange('city', e.target.value)} required /></Field>
                <div className="row g-3">
                  <div className="col-6"><Field label="State"><input className="form-control" placeholder="State" value={form.state} onChange={e => handleFormChange('state', e.target.value)} /></Field></div>
                  <div className="col-6"><Field label="Zip Code"><input className="form-control" placeholder="Zip Code" value={form.zip} onChange={e => handleFormChange('zip', e.target.value)} /></Field></div>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" id="diffBilling" checked={diffBilling} onChange={e=>setDiffBilling(e.target.checked)}/>
                  <label className="form-check-label small" htmlFor="diffBilling">Use a different billing address (optional)</label>
                </div>
              </div>

              {/* Payment */}
              <div className="border rounded-3 p-4 mb-4">
                <h5 className="fw-bold mb-4">Payment method</h5>
                {[{id:'card',label:'Pay by Card Credit',icon:'bi-credit-card-2-front'},{id:'paypal',label:'Paypal',icon:null}].map(opt=>(
                  <label key={opt.id} className={`d-flex align-items-center gap-3 border rounded-3 p-3 mb-2 ${payment===opt.id?'border-dark bg-light':''}`} style={{cursor:'pointer'}}>
                    <input type="radio" name="payment" value={opt.id} checked={payment===opt.id} onChange={()=>setPayment(opt.id)} className="form-check-input mt-0"/>
                    <span className="flex-grow-1 small fw-medium">{opt.label}</span>
                    {opt.icon && <i className={`bi ${opt.icon} text-muted fs-5`}></i>}
                  </label>
                ))}
                {payment==='card' && (
                  <div className="mt-3 pt-3 border-top">
                    <Field label="Card Number"><input className="form-control" placeholder="1234 1234 1234" value={form.cardNumber} onChange={e => handleFormChange('cardNumber', e.target.value)} maxLength={19} /></Field>
                    <div className="row g-3">
                      <div className="col-6"><Field label="Expiration Date"><input className="form-control" placeholder="MM/YY" value={form.expiry} onChange={e => handleFormChange('expiry', e.target.value)} maxLength={5} /></Field></div>
                      <div className="col-6"><Field label="CVC"><input className="form-control" placeholder="CVC code" value={form.cvc} onChange={e => handleFormChange('cvc', e.target.value)} maxLength={4} /></Field></div>
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-dark w-100 py-3 fw-semibold d-lg-none">Place Order</button>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="col-lg-5">
              <div className="border rounded-3 p-4 mb-3">
                <h5 className="fw-bold mb-3">Order summary</h5>
                {cartItems.map(item=>(
                  <div key={item.id} className="d-flex gap-3 py-3 border-bottom align-items-start position-relative">
                    <div className="table-img"><img src={item.image} alt={item.name}/></div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold small">{item.name}</span>
                        <span className="fw-semibold small ms-2">${(item.price*item.qty).toFixed(2)}</span>
                      </div>
                      <div className="text-muted small mb-2">Color: {item.color}</div>
                      <div className="qty-control">
                        <button type="button" onClick={()=>updateQty(item.id,item.qty-1)} disabled={item.qty<=1}>−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button type="button" onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                      </div>
                    </div>
                    <button type="button" className="btn btn-link text-muted p-0 small position-absolute top-0 end-0 mt-3" onClick={()=>removeItem(item.id)}>
                      <i className="bi bi-x-lg small"></i>
                    </button>
                  </div>
                ))}

                {/* Coupon */}
                <div className="mt-3">
                  <div className="input-group mb-2">
                    <input className="form-control" placeholder="Input" value={applied?'':coupon} onChange={e=>setCoupon(e.target.value)} disabled={applied}/>
                    <button type="button" className="btn btn-dark" onClick={()=>coupon&&setApplied(true)}>Apply</button>
                  </div>
                  {applied && (
                    <div className="d-flex align-items-center gap-2 small">
                      <i className="bi bi-tag text-muted"></i>
                      <span className="fw-semibold">JenkateMW</span>
                      <span className="text-success fw-semibold">-$25.00</span>
                      <button type="button" className="btn btn-link text-success p-0 small fw-semibold"
                        onClick={()=>{setApplied(false);setCoupon('')}}>[Remove]</button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="border-top mt-3 pt-3">
                  <div className="d-flex justify-content-between small text-muted mb-1"><span>Shipping</span><span className="text-success fw-semibold">Free</span></div>
                  <div className="d-flex justify-content-between small text-muted mb-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
              <button type="submit" className="btn btn-dark w-100 py-3 fw-semibold d-none d-lg-block">Place Order</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CheckoutPage
