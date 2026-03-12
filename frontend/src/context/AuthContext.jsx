import { createContext, useContext, useEffect, useState } from 'react'

const LMS_AUTH_KEY = 'lms_auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const loadSession = async () => {
      try {
        const stored = localStorage.getItem(LMS_AUTH_KEY)
        if (!stored) return

        const parsed = JSON.parse(stored)
        if (!parsed?.token) return

        setToken(parsed.token)

        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${parsed.token}` },
        })
        if (!res.ok) {
          localStorage.removeItem(LMS_AUTH_KEY)
          setToken(null)
          setUser(null)
          return
        }
        const data = await res.json()
        setUser(data.user ?? null)
      } catch (error) {
        console.error('Failed to restore session', error)
        localStorage.removeItem(LMS_AUTH_KEY)
        setToken(null)
        setUser(null)
      }
    }

    loadSession()
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) return false

      const data = await res.json()
      if (!data?.token || !data?.user) return false

      setToken(data.token)
      setUser(data.user)
      localStorage.setItem(LMS_AUTH_KEY, JSON.stringify({ token: data.token, user: data.user }))
      return true
    } catch {
      return false
    }
  }

  const signup = async (email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) return false
      return login(email, password)
    } catch {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(LMS_AUTH_KEY)
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
