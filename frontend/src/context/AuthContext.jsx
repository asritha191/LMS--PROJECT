import { createContext, useContext, useEffect, useState } from 'react'

const LMS_USER_KEY = 'lms_user'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LMS_USER_KEY)
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Failed to parse stored user', error)
    }
  }, [])

  const login = (email, password) => {
    if (!email || !password) {
      return false
    }

    const userData = { email }
    setUser(userData)
    localStorage.setItem(LMS_USER_KEY, JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(LMS_USER_KEY)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
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

