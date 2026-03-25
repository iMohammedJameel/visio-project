import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

const defaultItems = [
  {
    id: 1,
    name: "Men's Shark Logo Golf Polo Shirt",
    color: 'White',
    price: 24.99,
    qty: 1,
    image: '/assets/images/2.png',
  },
  {
    id: 2,
    name: 'Utility 8-Pocket Double Strap Bag All Black',
    color: 'Black',
    price: 305.00,
    qty: 1,
    image: '/assets/images/4.png',
  },
]

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState(defaultItems)

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }

  function toggleCart() {
    setIsOpen(!isOpen)
  }

  function removeItem(id) {
    const filtered = cartItems.filter(function (item) {
      return item.id !== id
    })
    setCartItems(filtered)
  }

  function updateQty(id, newQty) {
    if (newQty < 1) return

    const updated = cartItems.map(function (item) {
      if (item.id === id) {
        return { ...item, qty: newQty }
      }
      return item
    })
    setCartItems(updated)
  }

  function addItem(newItem) {
    const exists = cartItems.find(function (item) {
      return item.id === newItem.id && item.color === newItem.color
    })

    if (exists) {
      const updated = cartItems.map(function (item) {
        if (item.id === newItem.id && item.color === newItem.color) {
          return { ...item, qty: item.qty + 1 }
        }
        return item
      })
      setCartItems(updated)
    } else {
      setCartItems([...cartItems, { ...newItem, qty: 1 }])
    }
  }

  let totalCount = 0
  for (let i = 0; i < cartItems.length; i++) {
    totalCount += cartItems[i].qty
  }

  return (
    <CartContext.Provider value={{
      isOpen, openCart, closeCart, toggleCart,
      cartItems, removeItem, updateQty, addItem,
      totalCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
