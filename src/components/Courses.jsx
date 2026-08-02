import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './Courses.css'

function Courses() {
  const [courseData, setCourseData] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase.from('courses').select('*')
      if (error) {
        console.error(error)
      } else {
        setCourseData(data)
      }
    }
    fetchCourses()
  }, [])

  function handleEnroll(courseId) {
    setEnrolledCourses([...enrolledCourses, courseId])
  }

  return (
    <section className="courses">
      <h2>Explore Our Courses</h2>
      <div className="course-list">
        {courseData.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={() => handleEnroll(course.id)}>
              {enrolledCourses.includes(course.id) ? "Enrolled ✓" : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Courses