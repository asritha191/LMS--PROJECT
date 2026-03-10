import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">LMS</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/my-courses" className="nav-link">
          My Courses
        </NavLink>
      </div>
      <div className="navbar-auth">
        {isAuthenticated ? (
          <button type="button" className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-ghost">
              Login
            </NavLink>
            <NavLink to="/signup" className="btn btn-primary">
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

