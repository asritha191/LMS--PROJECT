const CourseCard = ({ course, onViewDetails }) => {
  return (
    <div className="course-card">
      <div className="course-image-wrapper">
        <img src={course.image} alt={course.title} className="course-image" />
      </div>
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">
          {course.description?.length > 100
            ? `${course.description.slice(0, 100)}...`
            : course.description}
        </p>
        <div className="course-meta">
          <span className="course-instructor">
            Instructor: {course.instructor || 'John Smith'}
          </span>
          <span className="course-duration">
            Duration: {course.duration || '6 Hours'}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary course-details-btn"
          onClick={onViewDetails}
        >
          Learn {course.language || 'this course'}
        </button>
      </div>
    </div>
  )
}

export default CourseCard

