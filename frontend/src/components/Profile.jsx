import { useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile({ user, onBack }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    const handleSaveProfile = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/auth/profile/${user.id}`,
      {
        name: name,
        email: email
      }
    );

    alert("Profile updated successfully! 🎉");
    setEditing(false);
  } catch (error) {
    console.error(error);
    alert("Failed to update profile.");
  }
};


  return (
    <div className="profile-page">

      <header className="profile-header">
        <p className="profile-label">MY ACCOUNT</p>
        <h1>Profile</h1>
        <p>View your PrepMate account information.</p>
      </header>

      <main className="profile-content">

        <section className="profile-card">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h2>{user?.name || "User"}</h2>
          <p className="profile-role">PrepMate Student</p>

          {editing && (
  <div className="edit-form">
    <label>Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <label>Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <button
  className="save-profile-btn"
  onClick={handleSaveProfile}
>
  Save Changes
</button>

  </div>
)}

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user?.name || "Not available"}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email || "Not available"}</strong>
            </div>
          </div>

          <button
  className="edit-profile-btn"
  onClick={() => setEditing(!editing)}
>
  {editing ? "Cancel Edit" : "Edit Profile"}
</button>

          <button onClick={onBack}>
            ← Back to Dashboard
          </button>

        </section>

      </main>
    </div>
  );
}

export default Profile;