import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile({ user, onBack }) {

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [progress, setProgress] = useState([]);
  const [totalDSAQuestions, setTotalDSAQuestions] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(true);


  /* ================= FETCH USER PROGRESS ================= */

  useEffect(() => {

    const loadProgress = async () => {

      if (!user?.id) {
        setLoadingProgress(false);
        return;
      }

      try {

        const [questionsResponse, progressResponse] =
          await Promise.all([
            axios.get(
              "http://localhost:8080/api/questions"
            ),
            axios.get(
              `http://localhost:8080/api/progress/${user.id}`
            )
          ]);

        const allQuestions = questionsResponse.data;

        const dsaQuestions = allQuestions.filter(
          (question) =>
            question.topic === "Arrays" ||
            question.topic === "Strings"
        );

        setTotalDSAQuestions(dsaQuestions.length);
        setProgress(progressResponse.data);

      } catch (error) {

        console.error(
          "Failed to load progress:",
          error
        );

      } finally {

        setLoadingProgress(false);

      }
    };

    loadProgress();

  }, [user]);


  /* ================= DSA PROGRESS ================= */

  const dsaProgress = progress.filter(
    (item) =>
      item.status === "SOLVED" ||
      item.status === "solved"
  ).length;

  const dsaPercentage =
    totalDSAQuestions > 0
      ? Math.round(
          (dsaProgress / totalDSAQuestions) * 100
        )
      : 0;


  /* ================= UPDATE PROFILE ================= */

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

    // Updated user data localStorage me save
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: name,
        email: email
      })
    );

  } catch (error) {
    console.error(error);
    alert("Failed to update profile.");
  }
};

  return (

    <div className="profile-page">

      {/* ================= TOP HEADER ================= */}

      <header className="profile-topbar">

        <button
          className="profile-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div className="profile-page-title">

  <div className="profile-header-user">

    <div className="profile-header-avatar">
      {user?.name
        ? user.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U"}
    </div>

    <div>
      <span>MY ACCOUNT</span>
      <h1>{user?.name || "User"}</h1>
    </div>

  </div>

</div>

      </header>


      <main className="profile-content">

        {/* ================= PROFILE OVERVIEW ================= */}

        <section className="profile-overview">

          {/* LEFT PROFILE */}

          <div className="profile-main-card">

            <div className="profile-avatar-large">
  {user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U"}
</div>

            <div className="profile-main-info">

              <span className="profile-small-label">
                PREPMATE STUDENT
              </span>

              <h2>
                {user?.name || "User"}
              </h2>

              <p>
                {user?.email || "Email not available"}
              </p>

            </div>

          </div>


          {/* RIGHT ACCOUNT DETAILS */}

          <div className="account-card">

            <div className="account-card-header">

              <div>
                <span>ACCOUNT DETAILS</span>
                <h3>Personal Information</h3>
              </div>

              <button
                className="edit-profile-btn"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit"}
              </button>

            </div>


            {editing ? (

              <div className="edit-form">

                <div className="input-group">

                  <label>Name</label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>


                <div className="input-group">

                  <label>Email</label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </div>


                <button
                  className="save-profile-btn"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>

              </div>

            ) : (

              <div className="account-details">

                <div className="account-detail">

                  <span>Full Name</span>

                  <strong>
                    {user?.name || "Not available"}
                  </strong>

                </div>


                <div className="account-detail">

                  <span>Email Address</span>

                  <strong>
                    {user?.email || "Not available"}
                  </strong>

                </div>

              </div>

            )}

          </div>

        </section>


        {/* ================= PREPARATION ================= */}

        <section className="profile-preparation">

          <div className="profile-section-heading">

            <div>

              <span>MY PREPARATION</span>

              <h2>Preparation Progress</h2>

            </div>

            <p>
              Keep building your placement skills.
            </p>

          </div>


          {loadingProgress ? (

            <div className="progress-loading">
              Loading your progress...
            </div>

          ) : (

            <div className="progress-grid">

              {/* ================= DSA ================= */}

              <div className="progress-card">

                <div className="progress-card-header">

                  <div className="progress-icon">
                    💻
                  </div>

                  <div>
                    <h3>DSA & Coding</h3>
                    <span>Problem Solving</span>
                  </div>

                </div>


                <div className="progress-value">

                  <strong>
                    {dsaProgress}
                  </strong>

                  <span>
                    / {totalDSAQuestions} solved
                  </span>

                </div>


                <div className="profile-progress-bar">

                  <div
                    style={{
                      width: `${dsaPercentage}%`
                    }}
                  ></div>

                </div>


                <div className="progress-footer">

                  <span>
                    {dsaPercentage}% complete
                  </span>

                  <span>
                    {totalDSAQuestions - dsaProgress} left
                  </span>

                </div>

              </div>


              {/* ================= APTITUDE ================= */}

              <div className="progress-card">

                <div className="progress-card-header">

                  <div className="progress-icon">
                    🧠
                  </div>

                  <div>
                    <h3>Aptitude</h3>
                    <span>Placement Tests</span>
                  </div>

                </div>


                <div className="progress-value">

                  <strong>0</strong>

                  <span>/ coming soon</span>

                </div>


                <div className="profile-progress-bar">

                  <div style={{ width: "0%" }}></div>

                </div>


                <div className="progress-footer">

                  <span>Not started</span>

                </div>

              </div>


              {/* ================= TECHNICAL ================= */}

              <div className="progress-card">

                <div className="progress-card-header">

                  <div className="progress-icon">
                    📚
                  </div>

                  <div>
                    <h3>Technical MCQs</h3>
                    <span>Technical Preparation</span>
                  </div>

                </div>


                <div className="progress-value">

                  <strong>0</strong>

                  <span>/ coming soon</span>

                </div>


                <div className="profile-progress-bar">

                  <div style={{ width: "0%" }}></div>

                </div>


                <div className="progress-footer">

                  <span>Not started</span>

                </div>

              </div>

            </div>

          )}

        </section>


        {/* ================= PROFILE FOOTER ================= */}

        <div className="profile-footer-note">

          <span>🎯</span>

          <p>
            Your progress is saved as you practice.
            Keep learning consistently and prepare smart.
          </p>

        </div>

        {/* ================= ACTIVITY STREAK ================= */}

<section className="profile-streak">

  <div className="streak-header">
    <div>
      <span>ACTIVITY</span>
      <h2>Practice Streak</h2>
    </div>

    <p>Keep practicing every day 🔥</p>
  </div>

  <div className="streak-stats">
    <div>
      <strong>4</strong>
      <span>Current streak</span>
    </div>

    <div>
      <strong>7</strong>
      <span>Longest streak</span>
    </div>

    <div>
      <strong>18</strong>
      <span>Active days</span>
    </div>
  </div>

  <div className="streak-calendar">

    {Array.from({ length: 84 }).map((_, index) => (
      <div
        key={index}
        className={`streak-day ${
          index % 9 === 0
            ? "level-3"
            : index % 5 === 0
            ? "level-2"
            : index % 3 === 0
            ? "level-1"
            : ""
        }`}
      ></div>
    ))}

  </div>

  <div className="streak-legend">
    <span>Less</span>

    <div className="legend-box"></div>
    <div className="legend-box level-1"></div>
    <div className="legend-box level-2"></div>
    <div className="legend-box level-3"></div>

    <span>More</span>
  </div>

</section>

      </main>

    </div>
  );
}
export default Profile;

