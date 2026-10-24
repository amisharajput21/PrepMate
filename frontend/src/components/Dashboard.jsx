import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard({
  user,
  onLogout,
  onOpenDSA,
  onOpenAptitude,
  onOpenTechnical,
  onOpenProfile,
  onOpenRoadmap,
  darkMode,
  activityRefreshKey,
}) {
  const [activity, setActivity] = useState([]);
  const [streak, setStreak] = useState(0);
  const [activityLoading, setActivityLoading] =
    useState(true);

  const [calendarDate, setCalendarDate] =
    useState(new Date());

  // =========================================================
  // GET USER LOGIN DATE
  // =========================================================
  const loginDate = useMemo(() => {
    if (!user?.id) {
      return null;
    }

    return localStorage.getItem(
      `prepmate_login_date_${user.id}`
    );
  }, [user?.id]);

  // =========================================================
  // FETCH REAL ACTIVITY + STREAK
  // =========================================================
  useEffect(() => {
    if (!user?.id) {
      setActivity([]);
      setStreak(0);
      setActivityLoading(false);
      return;
    }

    const fetchActivity = async () => {
      try {
        setActivityLoading(true);

        const year =
          calendarDate.getFullYear();

        const month =
          calendarDate.getMonth() + 1;

        const [
          activityResponse,
          streakResponse,
        ] = await Promise.all([
          axios.get(
            `http://localhost:8080/api/activity/${user.id}/month`,
            {
              params: {
                year,
                month,
              },
            }
          ),

          axios.get(
            `http://localhost:8080/api/activity/${user.id}/streak`
          ),
        ]);

        console.log(
          "Monthly activity:",
          activityResponse.data
        );

        console.log(
          "Current streak:",
          streakResponse.data
        );

        setActivity(
          Array.isArray(
            activityResponse.data
          )
            ? activityResponse.data
            : []
        );

        setStreak(
          Number(
            streakResponse.data?.streak ||
              0
          )
        );
      } catch (error) {
        console.error(
          "Failed to load activity:",
          error.response?.data ||
            error.message
        );

        setActivity([]);
        setStreak(0);
      } finally {
        setActivityLoading(false);
      }
    };

    fetchActivity();
  }, [
    user?.id,
    calendarDate,
    activityRefreshKey,
  ]);

  // =========================================================
  // ACTIVE DATES LOOKUP
  // =========================================================
  const activityDates = useMemo(() => {
    return new Set(
      activity.map(
        (item) => item.activityDate
      )
    );
  }, [activity]);

  // =========================================================
  // CALENDAR
  // =========================================================
  const calendarDays = useMemo(() => {
    const year =
      calendarDate.getFullYear();

    const month =
      calendarDate.getMonth();

    const firstDay =
      new Date(year, month, 1);

    const daysInMonth =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const startDay =
      firstDay.getDay();

    const days = [];

    // =======================================================
    // PREVIOUS MONTH DAYS
    // =======================================================
    const previousMonthDays =
      new Date(
        year,
        month,
        0
      ).getDate();

    for (
      let i = startDay - 1;
      i >= 0;
      i--
    ) {
      days.push({
        day:
          previousMonthDays - i,
        muted: true,
      });
    }

    // =======================================================
    // CURRENT MONTH DAYS
    // =======================================================
    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      const dateString =
        `${year}-${String(
          month + 1
        ).padStart(
          2,
          "0"
        )}-${String(day).padStart(
          2,
          "0"
        )}`;

      const today = new Date();

      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isActive =
        activityDates.has(
          dateString
        );

      // -------------------------------------------------------
      // Has this date arrived yet?
      // -------------------------------------------------------

      const currentDate =
        new Date(
          year,
          month,
          day
        );

      const todayDate =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );

      const isPastOrToday =
        currentDate <= todayDate;

      // -------------------------------------------------------
      // IMPORTANT:
      // Inactive sticker should ONLY start from
      // user's login date.
      // -------------------------------------------------------

      const isAfterLogin =
        loginDate &&
        dateString >= loginDate;

      const isInactive =
        isAfterLogin &&
        isPastOrToday &&
        !isActive;

      days.push({
        day,
        dateString,
        streak: isActive,
        today: isToday,
        inactive: isInactive,
      });
    }

    // =======================================================
    // NEXT MONTH DAYS
    // =======================================================
    let nextDay = 1;

    while (
      days.length % 7 !== 0
    ) {
      days.push({
        day: nextDay++,
        muted: true,
      });
    }

    return days;
  }, [
    calendarDate,
    activityDates,
    loginDate,
  ]);

  // =========================================================
  // MONTH NAME
  // =========================================================
  const currentMonthName =
    calendarDate.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  // =========================================================
  // PREVIOUS MONTH
  // =========================================================
  const handlePreviousMonth = () => {
    setCalendarDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() - 1,
        1
      )
    );
  };

  // =========================================================
  // NEXT MONTH
  // =========================================================
  const handleNextMonth = () => {
    setCalendarDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + 1,
        1
      )
    );
  };

  return (
    <div
      className={`dashboard-layout ${
        darkMode
          ? "dark-mode"
          : ""
      }`}
    >
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-grid">

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <section className="main-content-card">

              <div className="hero-section">

                <span className="hero-label">
                  PREP SMARTER
                </span>

                <h1>
                  Build skills that make
                  <span>
                    opportunities easier
                    to reach.
                  </span>
                </h1>

                <p>
                  Learn consistently,
                  practice smartly,
                  <br />
                  and stay one step
                  ahead.
                </p>

              </div>

              <div className="section-divider"></div>

              <div className="courses-section">

                <div className="courses-heading">

                  <div>

                    <span className="section-label">
                      UPCOMING
                    </span>

                    <h2>
                      Courses
                    </h2>

                  </div>

                  <button
                    type="button"
                    className="view-all-btn"
                  >
                    View All{" "}
                    <span>›</span>
                  </button>

                </div>

                <div className="course-feature-card">

                  <div className="course-feature-content">

                    <div className="coming-soon-badge">
                      <span>◷</span>
                      Coming Soon
                    </div>

                    <h3>
                      Explore our upcoming
                      courses
                    </h3>

                    <p>
                      Build in-demand
                      skills with curated
                      learning paths,
                      designed for your
                      placement journey.
                    </p>

                    <div className="course-tags">

                      <span>
                        <b>
                          &lt;/&gt;
                        </b>
                        DSA &amp; Algorithms
                      </span>

                      <span>
                        <b>◉</b>
                        Web Development
                      </span>

                      <span>
                        <b>▱</b>
                        System Design
                      </span>

                      <span>
                        <b>◉</b>
                        Aptitude
                      </span>

                    </div>

                  </div>

                  <div className="course-illustration">

                    <span className="spark spark-one">
                      ✦
                    </span>

                    <span className="spark spark-two">
                      ✦
                    </span>

                    <div className="course-back-card"></div>

                    <div className="course-front-card">
                      <span>
                        🎓
                      </span>
                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="dsa-sheet-btn"
                  onClick={
                    onOpenDSA
                  }
                >

                  <span className="dsa-sheet-icon">
                    &lt;/&gt;
                  </span>

                  <span className="dsa-sheet-text">
                    DSA Sheet
                  </span>

                  <span className="dsa-sheet-arrow">
                    →
                  </span>

                </button>

              </div>

            </section>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <aside className="dashboard-right">

              {/* =================================================
                  STREAK
              ================================================= */}

              <section className="streak-card">

                <div className="streak-title-row">

                  <div className="streak-title">

                    <span className="streak-fire">
                      🔥
                    </span>

                    <h2>
                      Streak
                    </h2>

                  </div>

                  <span className="streak-link">

                    {streak}{" "}

                    {streak === 1
                      ? "Day"
                      : "Days"}{" "}

                    Streak{" "}
                    <b>›</b>

                  </span>

                </div>

                <div className="calendar-box">

                  {/* MONTH */}

                  <div className="calendar-month-row">

                    <button
                      type="button"
                      onClick={
                        handlePreviousMonth
                      }
                      aria-label="Previous month"
                    >
                      ‹
                    </button>

                    <strong>
                      {currentMonthName}
                    </strong>

                    <button
                      type="button"
                      onClick={
                        handleNextMonth
                      }
                      aria-label="Next month"
                    >
                      ›
                    </button>

                  </div>

                  {/* WEEK */}

                  <div className="calendar-week">

                    <span>SUN</span>
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>

                  </div>

                  {/* CALENDAR */}

                  <div className="calendar-grid">

                    {activityLoading ? (

                      Array.from({
                        length: 35,
                      }).map(
                        (_, index) => (
                          <div
                            key={
                              index
                            }
                            className="calendar-cell"
                          >
                            <span></span>
                          </div>
                        )
                      )

                    ) : (

                      calendarDays.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={`${item.day}-${index}`}
                            className={[
                              "calendar-cell",

                              item.muted
                                ? "muted"
                                : "",

                              item.streak
                                ? "streak"
                                : "",

                              item.inactive
                                ? "inactive"
                                : "",

                              item.today
                                ? "today"
                                : "",
                            ]
                              .filter(
                                Boolean
                              )
                              .join(
                                " "
                              )}

                            style={
                              !item.muted
                                ? {
                                    display:
                                      "flex",
                                    alignItems:
                                      "center",
                                    justifyContent:
                                      "center",
                                  }
                                : undefined
                            }
                          >

                            {/* ACTIVE */}

                            {item.streak ? (

                              <span
                                style={{
                                  fontSize:
                                    "20px",
                                  lineHeight:
                                    "20px",
                                  display:
                                    "block",
                                  filter:
                                    "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3))",
                                }}
                                aria-label="Active learning day"
                                title="Active learning day"
                              >
                                🔥
                              </span>

                            ) : item.inactive ? (

                              /* INACTIVE */

                              <span
                                style={{
                                  fontSize:
                                    "17px",
                                  lineHeight:
                                    "17px",
                                  display:
                                    "block",
                                  opacity:
                                    0.65,
                                  filter:
                                    "grayscale(0.25)",
                                }}
                                aria-label="No activity"
                                title="No activity"
                              >
                                😴
                              </span>

                            ) : (

                              /* BEFORE LOGIN / FUTURE */

                              <span>
                                {item.day}
                              </span>

                            )}

                          </div>

                        )
                      )

                    )}

                  </div>

                </div>

                {/* LEGEND */}

                <div className="calendar-legend">

                  <span>
                    <i className="legend-streak"></i>
                    Learning streak
                  </span>

                  <span>
                    <i className="legend-today"></i>
                    Today
                  </span>

                  <span>
                    <i className="legend-inactive"></i>
                    No activity
                  </span>

                </div>

              </section>

              {/* =================================================
                  TODAY CARD
              ================================================= */}

              <section className="today-card">

                <div className="today-content">

                  <span className="section-label">
                    TODAY
                  </span>

                  <h3>
                    Keep the streak going!
                  </h3>

                  <p>
                    {streak > 0
                      ? `You're on a ${streak} day streak. Great momentum!`
                      : "Start solving today to build your streak!"}
                  </p>

                </div>

                <div className="today-icon">
                  🔥
                </div>

              </section>

            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;