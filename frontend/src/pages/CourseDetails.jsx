import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseById } from '../services/api.js'

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
      'https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=800',
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
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'React Full Course',
    language: 'React',
    instructor: 'SuperSimpleDev',
    duration: '8 Hours',
    level: 'Beginner',
    rating: '4.6',
    description:
      'Deep dive into closures, prototypes, async/await, and advanced patterns for modern JavaScript apps.',
    image:
      'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Java For Programmers',
    language: 'Java',
    instructor: 'Navin Reddy',
    duration: '10 Hours',
    level: 'Intermediate',
    rating: '4.8',
    description:
      'Build powerful single-page applications with React components, hooks, routing, and state management.',
    image:
      'https://images.pexels.com/photos/2706379/pexels-photo-2706379.jpeg?auto=compress&cs=tinysrgb&w=800',
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
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
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

const ENROLLED_KEY = 'lms_enrolled_courses'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrollMessage, setEnrollMessage] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await getCourseById(id)
        const base = response.data
        const template = programmingCourseTemplates.find(
          (t) => String(t.id) === String(id),
        )
        if (template) {
          setCourse({
            ...base,
            id: template.id,
            title: template.title,
            description: template.description,
            image: template.image,
            instructor: template.instructor,
            duration: template.duration,
            language: template.language,
            level: template.level,
            rating: template.rating,
          })
        } else {
          setCourse(base)
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load course details.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  const handleEnroll = () => {
    if (!course) return
    try {
      const stored = localStorage.getItem(ENROLLED_KEY)
      const enrolled = stored ? JSON.parse(stored) : []
      const exists = enrolled.some((c) => String(c.id) === String(course.id))
      if (exists) {
        setEnrollMessage('You are already enrolled in this course.')
        return
      }
      const newCourse = { ...course, progress: 0 }
      const updated = [...enrolled, newCourse]
      localStorage.setItem(ENROLLED_KEY, JSON.stringify(updated))
      setEnrollMessage('Enrolled successfully! You can find it in My Courses.')
    } catch (err) {
      console.error(err)
      setEnrollMessage('Failed to enroll. Please try again.')
    }
  }

  const handleGoToPlayer = () => {
    navigate(`/player/${id}`)
  }

  if (loading) {
    return (
      <div className="page">
        <p>Loading course...</p>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="page">
        <p className="error-text">{error || 'Course not found.'}</p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="course-details">
        <div className="course-details-image-wrapper">
          <img
            src={course.image}
            alt={course.title}
            className="course-details-image"
          />
        </div>
        <div className="course-details-content">
          <h1 className="course-details-title">{course.title}</h1>
          <p className="course-details-description">{course.description}</p>
          <div className="course-details-meta">
            <span>Instructor: {course.instructor || 'Instructor'}</span>
            <span>Duration: {course.duration || 'Course duration'}</span>
          </div>
          <div className="course-details-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEnroll}
            >
              Enroll Course
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGoToPlayer}
            >
              Open Course Player
            </button>
          </div>
          {enrollMessage && (
            <p className="enroll-message">{enrollMessage}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseDetails

