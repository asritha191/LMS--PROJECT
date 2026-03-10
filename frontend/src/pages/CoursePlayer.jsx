import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

const ENROLLED_KEY = 'lms_enrolled_courses'

const CoursePlayer = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [activeLessonId, setActiveLessonId] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ENROLLED_KEY)
      const enrolled = stored ? JSON.parse(stored) : []
      const found = enrolled.find((c) => String(c.id) === String(id))
      setCourse(found || null)
    } catch (error) {
      console.error('Failed to load course for player', error)
      setCourse(null)
    }
  }, [id])

  const lessons = useMemo(() => {
    const baseTitle = course?.title || 'Lesson'
    return [
      { id: 1, title: `${baseTitle} - Introduction` },
      { id: 2, title: `${baseTitle} - Core Concepts` },
      { id: 3, title: `${baseTitle} - Practical Project` },
      { id: 4, title: `${baseTitle} - Advanced Topics` },
      { id: 5, title: `${baseTitle} - Summary & Next Steps` },
    ]
  }, [course])

  useEffect(() => {
    if (lessons.length > 0 && activeLessonId == null) {
      setActiveLessonId(lessons[0].id)
    }
  }, [lessons, activeLessonId])

  const activeLesson = lessons.find((l) => l.id === activeLessonId)

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">
          {course ? course.title : 'Course Player'}
        </h1>
        <p className="page-subtitle">
          Watch lessons and track your progress.
        </p>
      </header>

      <div className="course-player">
        <div className="course-player-video">
          <div className="video-placeholder">
            <p className="video-label">Video Player</p>
            <p className="video-title">
              {activeLesson
                ? activeLesson.title
                : 'Select a lesson to start learning'}
            </p>
            <p className="video-hint">
              This is a placeholder. Integrate a real video player here.
            </p>
          </div>
        </div>
        <div className="course-player-lessons">
          <h2 className="lessons-title">Lessons</h2>
          <ul className="lessons-list">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <button
                  type="button"
                  className={`lesson-item${
                    lesson.id === activeLessonId ? ' active' : ''
                  }`}
                  onClick={() => setActiveLessonId(lesson.id)}
                >
                  {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer

