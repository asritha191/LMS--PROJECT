import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCourses } from '../services/api.js'
import SearchBar from '../components/SearchBar.jsx'
import CourseCard from '../components/CourseCard.jsx'

const programmingCourseTemplates = [
  {
    id: 1,
    title: 'HTML & CSS Fundamentals',
    language: 'HTML & CSS',
    instructor: 'Sarah Lee',
    duration: '5 Hours',
    level: 'Beginner',
    rating: '4.7',
    description:
      'Learn the building blocks of the web with clean HTML and modern CSS layout techniques.',
    image:
      'https://images.pexels.com/photos/2706379/pexels-photo-2706379.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'JavaScript for Beginners',
    language: 'JavaScript',
    instructor: 'John Smith',
    duration: '6 Hours',
    level: 'Beginner',
    rating: '4.5',
    description:
      'Start from zero and learn JavaScript syntax, variables, functions, and working with the browser.',
    image:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Advanced JavaScript Concepts',
    language: 'JavaScript',
    instructor: 'Michael Brown',
    duration: '8 Hours',
    level: 'Intermediate',
    rating: '4.6',
    description:
      'Deep dive into closures, prototypes, async/await, and advanced patterns for modern JavaScript apps.',
    image:
      'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'React.js Complete Guide',
    language: 'JavaScript / React',
    instructor: 'Emily Johnson',
    duration: '10 Hours',
    level: 'Intermediate',
    rating: '4.8',
    description:
      'Build powerful single-page applications with React components, hooks, routing, and state management.',
    image:
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    title: 'Full Stack Web Development Bootcamp',
    language: 'HTML, CSS, JS, React, Node',
    instructor: 'David Wilson',
    duration: '20 Hours',
    level: 'Intermediate',
    rating: '4.9',
    description:
      'Go from frontend to backend and learn to build complete full stack web applications.',
    image:
      'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    title: 'Responsive Web Design Masterclass',
    language: 'HTML & CSS',
    instructor: 'Anna Davis',
    duration: '7 Hours',
    level: 'Intermediate',
    rating: '4.7',
    description:
      'Create pixel-perfect layouts that look great on mobile, tablet, and desktop using modern CSS.',
    image:
      'https://images.pexels.com/photos/3861973/pexels-photo-3861973.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

const Home = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await getCourses()
        const limited = response.data.slice(
          0,
          programmingCourseTemplates.length,
        )
        const formatted = limited.map((item, index) => {
          const template = programmingCourseTemplates[index]
          return {
            id: template.id ?? item.id,
            title: template.title,
            language: template.language,
            instructor: template.instructor,
            duration: template.duration,
            level: template.level,
            rating: template.rating,
            description: template.description,
            image: template.image,
          }
        })
        setCourses(formatted)
        setFilteredCourses(formatted)
      } catch (err) {
        console.error(err)
        setError('Failed to load courses. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      setFilteredCourses(courses)
      return
    }
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(term),
      ),
    )
  }, [searchTerm, courses])

  const handleViewDetails = (id) => {
    navigate(`/course/${id}`)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Discover Courses</h1>
        <p className="page-subtitle">
          Browse our catalog and start learning new skills today.
        </p>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading && <p>Loading courses...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && filteredCourses.length === 0 && (
        <p>No courses found.</p>
      )}

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={() => handleViewDetails(course.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home

