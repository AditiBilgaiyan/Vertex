import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  function handleAction(title) {

  if (title === "Continue Learning") {
    navigate("/dashboard");
  }

  if (title === "Ask AI Tutor") {
    // Abhi AI Tutor ka route baad me add karenge
    alert("AI Tutor");
  }

  if (title === "Edit Profile") {
    navigate("/profile");
  }

}
  const courses = [
    {
      title: "React Fundamentals",
      progress: "20%",
      completed: false,
    },
    {
      title: "JavaScript Basics",
      progress: "45%",
      completed: false,
    },
    {
      title: "HTML & CSS",
      progress: "100%",
      completed: true,
    },
  ];

  const activities = [
    {
      id: 1,
      icon: "✅",
      text: "Completed HTML & CSS",
    },
    {
      id: 2,
      icon: "📚",
      text: "JavaScript Basics - 45% Complete",
    },
    {
      id: 3,
      icon: "🚀",
      text: "Started React Fundamentals",
    },
  ];

  const quickActions = [
  {
    id: 1,
    icon: "🚀",
    title: "Continue Learning",
  },
  {
    id: 2,
    icon: "🤖",
    title: "Ask AI Tutor",
  },
  {
    id: 3,
    icon: "👤",
    title: "Edit Profile",
  },
];


    const totalProgress = courses.reduce((total, course) => {
    return total + parseInt(course.progress);
    }, 0);

  const averageProgress = Math.round(
  totalProgress / courses.length
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">

        {/* Header */}
        <div className="dashboard-header">
          <h1>Vertex Learn AI</h1>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome Back 👋</h2>

          <p>
            You have successfully logged in.
            <br />
            Keep learning every day and improve your skills.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>📚 Total Courses</h3>
            <p>{courses.length}</p>
          </div>

          <div className="stat-card">
            <h3>📈 Progress</h3>
            <p>{averageProgress}%</p>
          </div>

          <div className="stat-card">
            <h3>🤖 AI Tutor</h3>
            <p>Available</p>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="continue-learning">
          <h2>📚 Continue Learning</h2>

          {courses.map((course) => (
            <div className="course-card" key={course.title}>
              <div>
                <h3>{course.title}</h3>
                <p>Progress: {course.progress}</p>

                <div className="progress-bar">
              <div
               className="progress-fill"
              style={{ width: course.progress }}
               ></div>
</div>
              </div>
             <button
             className={
             course.completed
              ? "completed-btn"
              : "continue-btn"
  }
>
  {course.completed ? "Completed" : "Continue"}
</button>
            </div>
          ))}
        </div>
      <div className="recent-activity">
          <h2>📌 Recent Activity</h2>

          {activities.map((activity) => (
            <div
              className="activity-card"
              key={activity.id}
            >
              <span className="activity-icon">
                {activity.icon}
              </span>

              <span className="activity-text">
                {activity.text}
              </span>
            </div>
          ))}
        </div>

      {/* Quick Actions */}

<div className="quick-actions">
  <h2>⚡ Quick Actions</h2>

  <div className="actions-container">
    {quickActions.map((action) => (
      <div
      className="action-card"
      key={action.id}
      onClick={() => handleAction(action.title)}
>
        <span className="action-icon">
          {action.icon}
        </span>

        <p className="action-title">
          {action.title}
        </p>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}
export default Dashboard;