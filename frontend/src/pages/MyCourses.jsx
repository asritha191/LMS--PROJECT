import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ENROLLED_KEY = 'lms_enrolled_courses'

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ENROLLED_KEY)
      const enrolled = stored ? JSON.parse(stored) : []
      setCourses(enrolled)
    } catch (error) {
      console.error('Failed to load enrolled courses', error)
      setCourses([])
    }
  }, [])

  const handleOpenPlayer = (id) => {
    navigate(`/player/${id}`)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">
          Continue learning from your enrolled courses.
        </p>
      </header>

      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <div className="my-courses-list">
          {courses.map((course) => {
            const progress = typeof course.progress === 'number' ? course.progress : 0
            return (
              <div key={course.id} className="my-course-card">
                <div className="my-course-main">
                  <h3 className="my-course-title">{course.title}</h3>
                  <p className="my-course-meta">
                    Instructor: {course.instructor || 'Instructor'} · Duration:{' '}
                    {course.duration || 'Course duration'}
                  </p>
                </div>
                <div className="my-course-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="progress-label">{progress}% complete</span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleOpenPlayer(course.id)}
                >
                  Open Course Player
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyCourses

