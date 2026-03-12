import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    const success = await login(email, password)
    if (!success) {
      setError('Invalid credentials.')
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="page-title">Login</h1>
        <p className="page-subtitle">Access your learning dashboard.</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-control">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn btn-primary auth-submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
