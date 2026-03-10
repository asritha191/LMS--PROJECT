import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import CourseDetails from '../pages/CourseDetails.jsx'
import MyCourses from '../pages/MyCourses.jsx'
import CoursePlayer from '../pages/CoursePlayer.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/player/:id"
        element={
          <ProtectedRoute>
            <CoursePlayer />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default AppRoutes

