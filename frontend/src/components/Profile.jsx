import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile({ user }) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [progress, setProgress] = useState([]);
  const [totalDSAQuestions, setTotalDSAQuestions] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // =========================================================
  // ACTIVITY
  // =========================================================

  const [activityData, setActivityData] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);

  // =========================================================
  // UPDATE USER FORM WHEN USER CHANGES
  // =========================================================

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  /* =========================================================
     FETCH PROGRESS
  ========================================================= */

  useEffect(() => {
    const loadProgress = async () => {
      if (!user?.id) {
        setLoadingProgress(false);
        return;
      }

      try {
        const [questionsResponse, progressResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/api/questions"),
            axios.get(
              `http://localhost:8080/api/progress/${user.id}`
            ),
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
  }, [user?.id]);

  /* =========================================================
     FETCH LAST 12 MONTHS ACTIVITY
  ========================================================= */

  useEffect(() => {
    const loadActivity = async () => {
      if (!user?.id) {
        setActivityData([]);
        setCurrentStreak(0);
        setActivityLoading(false);
        return;
      }

      try {
        setActivityLoading(true);

        const today = new Date();

        const requests = [];

        /*
         * Last 12 months
         *
         * Example:
         * Nov 2025
         * Dec 2025
         * ...
         * Oct 2026
         */

        for (let i = 11; i >= 0; i--) {
          const date = new Date(
            today.getFullYear(),
            today.getMonth() - i,
            1
          );

          requests.push(
            axios.get(
              `http://localhost:8080/api/activity/${user.id}/month`,
              {
                params: {
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                },
              }
            )
          );
        }

        const [
          ...activityResponses
        ] = await Promise.all(requests);

        const combinedActivity =
          activityResponses.flatMap(
            (response) => response.data || []
          );

        setActivityData(combinedActivity);

        // Current streak
        const streakResponse = await axios.get(
          `http://localhost:8080/api/activity/${user.id}/streak`
        );

        setCurrentStreak(
          streakResponse.data?.streak || 0
        );
      } catch (error) {
        console.error(
          "Failed to load activity:",
          error
        );

        setActivityData([]);
        setCurrentStreak(0);
      } finally {
        setActivityLoading(false);
      }
    };

    loadActivity();
  }, [user?.id]);

  /* =========================================================
     DSA PROGRESS
  ========================================================= */

  const dsaProgress = progress.filter(
    (item) =>
      item.status === "SOLVED" ||
      item.status === "solved"
  ).length;

  const dsaPercentage =
    totalDSAQuestions > 0
      ? Math.min(
          100,
          Math.round(
            (dsaProgress / totalDSAQuestions) * 100
          )
        )
      : 0;

  const remainingDSA = Math.max(
    0,
    totalDSAQuestions - dsaProgress
  );

  /* =========================================================
     ACTIVITY DATE LOOKUP
  ========================================================= */

  const activityDateSet = useMemo(() => {
    return new Set(
      activityData.map(
        (item) => item.activityDate
      )
    );
  }, [activityData]);

  /* =========================================================
     LAST 12 MONTHS
  ========================================================= */

  const activityMonths = useMemo(() => {
    const today = new Date();

    return Array.from(
      { length: 12 },
      (_, index) => {
        const date = new Date(
          today.getFullYear(),
          today.getMonth() -
            (11 - index),
          1
        );

        return {
          name: date.toLocaleDateString(
            "en-US",
            {
              month: "short",
            }
          ),

          year: date.getFullYear(),

          month: date.getMonth(),

          days: new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          ).getDate(),
        };
      }
    );
  }, []);

  /* =========================================================
     ACTIVITY SUMMARY
  ========================================================= */

  const activeDays = activityData.length;

  /* =========================================================
     UPDATE PROFILE
  ========================================================= */

  const handleSaveProfile = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/auth/profile/${user.id}`,
        {
          name,
          email,
        }
      );

      alert(
        "Profile updated successfully! 🎉"
      );

      setEditing(false);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name,
          email,
        })
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to update profile."
      );
    }
  };

  /* =========================================================
     INITIALS
  ========================================================= */

  const getInitials = (value) => {
    if (!value) return "U";

    return value
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="profile-page">

      <main className="profile-content">

        {/* =====================================================
            PROFILE OVERVIEW
        ===================================================== */}

        <section className="profile-overview">

          {/* PROFILE CARD */}

          <div className="profile-main-card">

            <div className="profile-avatar-large">
              {getInitials(user?.name)}
            </div>

            <div className="profile-main-info">

              <span className="profile-small-label">
                PREPMATE STUDENT
              </span>

              <h2>
                {user?.name || "User"}
              </h2>

              <p>
                {user?.email ||
                  "Email not available"}
              </p>

              <div className="profile-status">
                <span></span>
                Placement preparation active
              </div>

            </div>

          </div>

          {/* ACCOUNT CARD */}

          <div className="account-card">

            <div className="account-card-header">

              <div>
                <span>
                  ACCOUNT DETAILS
                </span>

                <h3>
                  Personal Information
                </h3>
              </div>

              <button
                className="edit-profile-btn"
                onClick={() =>
                  setEditing(!editing)
                }
              >
                {editing
                  ? "Cancel"
                  : "Edit"}
              </button>

            </div>

            {editing ? (

              <div className="edit-form">

                <div className="input-group">

                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="input-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

                <button
                  className="save-profile-btn"
                  onClick={
                    handleSaveProfile
                  }
                >
                  Save Changes
                </button>

              </div>

            ) : (

              <div className="account-details">

                <div className="account-detail">

                  <span>
                    Full Name
                  </span>

                  <strong>
                    {user?.name ||
                      "Not available"}
                  </strong>

                </div>

                <div className="account-detail">

                  <span>
                    Email Address
                  </span>

                  <strong>
                    {user?.email ||
                      "Not available"}
                  </strong>

                </div>

              </div>

            )}

          </div>

        </section>


        {/* =====================================================
            PREPARATION
        ===================================================== */}

        <section className="profile-preparation">

          <div className="profile-section-heading">

            <div>

              <span>
                MY PREPARATION
              </span>

              <h2>
                Preparation Progress
              </h2>

            </div>

            <div className="preparation-summary">

              <strong>
                {dsaPercentage}%
              </strong>

              <span>
                DSA completed
              </span>

            </div>

          </div>


          {loadingProgress ? (

            <div className="progress-loading">

              <div className="loading-dot"></div>

              Loading your progress...

            </div>

          ) : (

            <div className="progress-grid">

              {/* DSA */}

              <div className="progress-card progress-card-active">

                <div className="progress-card-top">

                  <div className="progress-card-header">

                    <div className="progress-icon">
                      💻
                    </div>

                    <div>

                      <h3>
                        DSA & Coding
                      </h3>

                      <span>
                        Problem Solving
                      </span>

                    </div>

                  </div>

                  <div className="progress-status active">
                    In Progress
                  </div>

                </div>


                <div className="progress-main">

                  <div className="progress-value">

                    <strong>
                      {dsaProgress}
                    </strong>

                    <span>
                      / {totalDSAQuestions} solved
                    </span>

                  </div>

                  <div className="progress-percentage">
                    {dsaPercentage}%
                  </div>

                </div>


                <div className="profile-progress-bar">

                  <div
                    style={{
                      width: `${dsaPercentage}%`,
                    }}
                  ></div>

                </div>


                <div className="progress-footer">

                  <span>
                    {dsaPercentage}%
                    complete
                  </span>

                  <span>
                    {remainingDSA} left
                  </span>

                </div>


                <div className="progress-card-action">

                  <span>
                    Keep practicing
                    Arrays & Strings
                  </span>

                  <span className="action-arrow">
                    →
                  </span>

                </div>

              </div>


              {/* APTITUDE */}

              <div className="progress-card progress-card-coming">

                <div className="progress-card-top">

                  <div className="progress-card-header">

                    <div className="progress-icon">
                      🧠
                    </div>

                    <div>

                      <h3>
                        Aptitude
                      </h3>

                      <span>
                        Placement Tests
                      </span>

                    </div>

                  </div>

                  <div className="progress-status upcoming">
                    Coming Soon
                  </div>

                </div>


                <div className="progress-main">

                  <div className="progress-value">

                    <strong>
                      0
                    </strong>

                    <span>
                      / coming soon
                    </span>

                  </div>

                </div>


                <div className="profile-progress-bar">

                  <div
                    style={{
                      width: "0%",
                    }}
                  ></div>

                </div>


                <div className="progress-footer">

                  <span>
                    Not started
                  </span>

                  <span>
                    —
                  </span>

                </div>


                <div className="progress-card-action muted-action">

                  <span>
                    Practice module
                    coming soon
                  </span>

                </div>

              </div>


              {/* TECHNICAL */}

              <div className="progress-card progress-card-coming">

                <div className="progress-card-top">

                  <div className="progress-card-header">

                    <div className="progress-icon">
                      📚
                    </div>

                    <div>

                      <h3>
                        Technical MCQs
                      </h3>

                      <span>
                        Technical Preparation
                      </span>

                    </div>

                  </div>

                  <div className="progress-status upcoming">
                    Coming Soon
                  </div>

                </div>


                <div className="progress-main">

                  <div className="progress-value">

                    <strong>
                      0
                    </strong>

                    <span>
                      / coming soon
                    </span>

                  </div>

                </div>


                <div className="profile-progress-bar">

                  <div
                    style={{
                      width: "0%",
                    }}
                  ></div>

                </div>


                <div className="progress-footer">

                  <span>
                    Not started
                  </span>

                  <span>
                    —
                  </span>

                </div>


                <div className="progress-card-action muted-action">

                  <span>
                    Technical module
                    coming soon
                  </span>

                </div>

              </div>

            </div>

          )}

        </section>


        {/* =====================================================
            FOOTER NOTE
        ===================================================== */}

        <div className="profile-footer-note">

          <span>
            🎯
          </span>

          <p>
            Your progress is saved as you
            practice. Keep learning
            consistently and prepare smart.
          </p>

          <span className="note-arrow">
            ✦
          </span>

        </div>


        {/* =====================================================
            PRACTICE ACTIVITY
        ===================================================== */}

        <section className="profile-streak">

          {/* ACTIVITY HEADER */}

          <div className="activity-header">

            <div className="activity-title">

              <span>
                ACTIVITY
              </span>

              <h2>
                Practice Activity
              </h2>

              <p>
                {activeDays} active{" "}
                {activeDays === 1
                  ? "day"
                  : "days"}
                {currentStreak > 0
                  ? ` · ${currentStreak} day streak`
                  : ""}
              </p>

            </div>


            <div className="activity-controls">

              <button
                type="button"
                className="activity-filter"
              >
                Last 12 months
                <span>⌄</span>
              </button>


              <div className="activity-legend">

                <span>
                  Less
                </span>

                <i className="activity-level-0"></i>

                <i className="activity-level-1"></i>

                <i className="activity-level-2"></i>

                <i className="activity-level-3"></i>

                <i className="activity-level-4"></i>

                <span>
                  More
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              ACTIVITY GRID
          ================================================= */}

          <div className="activity-scroll">

            <div className="activity-month-grid">

              {activityLoading ? (

                <div className="progress-loading">
                  <div className="loading-dot"></div>
                  Loading activity...
                </div>

              ) : (

                activityMonths.map(
                  (month) => {

                    /*
                     * First weekday of month.
                     *
                     * Sunday = 0
                     * Monday = 1
                     * ...
                     * Saturday = 6
                     */

                    const firstDay =
                      new Date(
                        month.year,
                        month.month,
                        1
                      ).getDay();

                    const cells = [];

                    /*
                     * Empty cells before
                     * first day of month.
                     */

                    for (
                      let i = 0;
                      i < firstDay;
                      i++
                    ) {
                      cells.push({
                        empty: true,
                      });
                    }

                    /*
                     * Actual days
                     */

                    for (
                      let day = 1;
                      day <= month.days;
                      day++
                    ) {
                      const dateString =
                        `${month.year}-${String(
                          month.month + 1
                        ).padStart(
                          2,
                          "0"
                        )}-${String(
                          day
                        ).padStart(
                          2,
                          "0"
                        )}`;

                      const active =
                        activityDateSet.has(
                          dateString
                        );

                      cells.push({
                        day,
                        active,
                        dateString,
                      });
                    }

                    /*
                     * Keep same compact
                     * 35-cell design.
                     */

                    while (
                      cells.length < 35
                    ) {
                      cells.push({
                        empty: true,
                      });
                    }

                    return (
                      <div
                        className="activity-month"
                        key={`${month.year}-${month.month}`}
                      >

                        {/* MONTH NAME */}

                        <div className="activity-month-label">
                          {month.name}
                        </div>


                        {/* CELLS */}

                        <div className="activity-month-cells">

                          {cells
                            .slice(0, 35)
                            .map(
                              (
                                cell,
                                index
                              ) => {

                                if (
                                  cell.empty
                                ) {
                                  return (
                                    <div
                                      key={
                                        index
                                      }
                                      className="activity-cell activity-empty"
                                    />
                                  );
                                }

                                return (
                                  <div
                                    key={
                                      index
                                    }
                                    className={`activity-cell ${
                                      cell.active
                                        ? "activity-level-1"
                                        : "activity-level-0"
                                    }`}
                                    title={
                                      cell.active
                                        ? `${cell.dateString} · Practice activity`
                                        : `${cell.dateString} · No activity`
                                    }
                                  />
                                );
                              }
                            )}

                        </div>

                      </div>
                    );
                  }
                )

              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;