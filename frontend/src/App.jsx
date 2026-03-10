import Navbar from './components/Navbar.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import './index.css'

const App = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App

