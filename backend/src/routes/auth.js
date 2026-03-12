import express from 'express'

const router = express.Router()

// In-memory user store (for demo purposes)
// In production, use a real database like MongoDB
const users = []

// Simple JWT-like token generation (for demo)
// In production, use proper JWT library like jsonwebtoken
const generateToken = (user) => {
  return Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64')
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' })
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password, // In production, hash the password!
    name: email.split('@')[0],
  }

  users.push(newUser)

  // Generate token
  const token = generateToken(newUser)

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  })
})

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  // Find user
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Generate token
  const token = generateToken(user)

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  })
})

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    const user = users.find((u) => u.id === decoded.id)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
})

export default router

