import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function CartDrawer() {
  const { isOpen, closeCart, cartItems, removeItem, updateQty } = useCart()
  const navigate = useNavigate()
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + 36

  function goCart() {
    closeCart()
    navigate('/cart')
  }

  function goCheckout() {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      <div className={`cart-overlay ${isOpen?'active':''}`} onClick={closeCart}/>
      <div className={`cart-drawer ${isOpen?'open':''}`}>

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
          <h4 className="font-playfair fw-bold mb-0">Cart</h4>
          <button className="btn btn-link text-muted p-0" onClick={closeCart}>
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        {/* Items */}
        <div className="cart-items p-3">
          {cartItems.length===0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-bag fs-1 d-block mb-2 text-secondary"></i>
              Your cart is empty
            </div>
          ) : cartItems.map(item=>(
            <div key={item.id} className="d-flex gap-3 py-3 border-bottom">
              <img src={item.image} alt={item.name} className="rounded-3 flex-shrink-0" style={{width:80,height:80,objectFit:'cover'}}/>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold small">{item.name}</span>
                  <span className="fw-semibold small">${item.price.toFixed(2)}</span>
                </div>
                <div className="text-muted small mb-2">Color: {item.color}</div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="qty-control">
                    <button onClick={()=>updateQty(item.id,item.qty-1)} disabled={item.qty<=1}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                  </div>
                  <button className="btn btn-link text-muted p-0 small" onClick={()=>removeItem(item.id)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartItems.length>0 && (
          <div className="p-4 border-top mt-auto">
            <div className="d-flex justify-content-between text-muted small mb-2">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-dark w-100 py-2 fw-semibold mb-2" onClick={goCheckout}>Checkout</button>
            <button className="btn btn-link w-100 text-dark fw-semibold small text-decoration-underline" onClick={goCart}>View Cart</button>
          </div>
        )}
      </div>
    </>
  )
}
export default CartDrawer
