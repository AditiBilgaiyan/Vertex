import "../styles/Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">

        <h1>👤 My Profile</h1>

        <div className="profile-avatar">
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="Profile"
          />
        </div>

        <div className="profile-info">

          <label>Full Name</label>
          <input
            type="text"
            value="Aditi Bilgaiyan"
            readOnly
          />

          <label>Email</label>
          <input
            type="email"
            value="aditi@gmail.com"
            readOnly
          />

          <label>Role</label>
          <input
            type="text"
            value="Full Stack Developer"
            readOnly
          />

        </div>

        <button className="save-btn">
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Profile;