import React, { createContext, useContext, useState } from 'react'
import { loginUser } from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function login(email, password) {
    setLoading(true)
    setError(null)
    try {
      const res = await loginUser({ email, password })
      const { token: newToken } = res.data.data
      localStorage.setItem('token', newToken)
      setToken(newToken)

      const payload = JSON.parse(atob(newToken.split('.')[1]))
      const userData = { id: payload.id, email: payload.email, role: payload.role }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      setError(msg)
      return { success: false, message: msg }
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const isLoggedIn = !!token

  return (
    <AuthContext.Provider value={{ user, token, error, loading, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
