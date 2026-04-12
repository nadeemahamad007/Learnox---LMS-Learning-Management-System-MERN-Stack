import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/client";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";
import { heroVisual } from "../courseVisuals";
import learningBoy from "../assets/learning-boy.avif";

function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const enrolledCourseIds = new Set(enrolledCourses.map((course) => course._id));
  const availableCourses = courses.length;
  const enrolledCount = enrolledCourses.length;
  const remainingCount = Math.max(availableCourses - enrolledCount, 0);
  const skillSortOrder = ["html", "css", "react", "js", "node", "mongo", "sql", "py", "ai", "ml", "ds"];

  const getSkillTags = (courseTitle = "", courseDescription = "") => {
    const text = `${courseTitle} ${courseDescription}`.toLowerCase();
    const tags = [];

    const add = (key, label, tone) => {
      if (!tags.some((tag) => tag.key === key)) {
        tags.push({ key, label, tone });
      }
    };

    if (text.includes("react")) add("react", "React", "indigo");
    if (text.includes("node") || text.includes("express")) add("node", "Node", "sky");
    if (text.includes("mongo")) add("mongo", "Mongo", "mint");
    if (text.includes("sql")) add("sql", "SQL", "sun");
    if (text.includes("python")) add("py", "Py", "coral");
    if (text.includes("data")) add("ds", "DS", "violet");
    if (text.includes("ai") || text.includes("artificial")) add("ai", "AI", "indigo");
    if (text.includes("ml") || text.includes("machine")) add("ml", "ML", "sky");
    if (text.includes("javascript")) add("js", "JS", "sun");

    if (!tags.length) {
      add("html", "HTML", "coral");
      add("css", "CSS", "sky");
      add("react", "React", "indigo");
    }

    return tags.slice(0, 3);
  };

  const heroSkillTags = courses
    .flatMap((course) => getSkillTags(course.title, course.description))
    .reduce((acc, tag) => {
      if (!acc.some((existing) => existing.key === tag.key)) {
        acc.push(tag);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const aIndex = skillSortOrder.indexOf(a.key);
      const bIndex = skillSortOrder.indexOf(b.key);
      const aRank = aIndex === -1 ? 999 : aIndex;
      const bRank = bIndex === -1 ? 999 : bIndex;
      return aRank - bRank;
    })
    .slice(0, 10);
  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [coursesResponse, enrolledResponse] = await Promise.all([
        api.get("/courses"),
        api.get("/enroll/my-courses")
      ]);

      setCourses(coursesResponse.data);
      setEnrolledCourses(enrolledResponse.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEnroll = async (courseId) => {
    setMessage("");
    setError("");

    try {
      const response = await api.post(`/enroll/${courseId}`);
      setMessage(response.data.message);
      await loadData();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) {
    return <p className="status-message">Loading courses...</p>;
  }

  return (
    <section className="dashboard-stack">
      <div className="dashboard-hero">
        <div className="hero-copy">
          <BrandLogo className="hero-brand" />
          <span className="hero-pill">New features available</span>
          <p className="eyebrow">Course catalog</p>
          <h1 className="marketplace-title">Build amazing learning experiences</h1>
          <p className="hero-text">
            Create beautiful learning journeys with curated courses, quick enrollment, and a
            polished student-friendly dashboard.
          </p>
          <div className="hero-points">
            <span>Easy to use</span>
            <span>Fast and secure</span>
            <span>24/7 support</span>
            <span>Fresh updates</span>
          </div>
          <div className="hero-actions">
            {user?.role === "admin" ? (
              <Link to="/admin/courses/new" className="primary-button inline-action">
                Add New Course
              </Link>
            ) : (
              <span className="helper-badge">Choose a course and enroll instantly.</span>
            )}
          </div>
        </div>

        <div className="hero-visual-card">
          <img src={heroVisual} alt="Learnox featured learning visual" className="hero-visual-image" />
          <img src={learningBoy} alt="" className="hero-boy" aria-hidden="true" />
          <div className="floating-tech-cloud" aria-hidden="true">
            {heroSkillTags.map((tag, idx) => (
              <span key={tag.key} className="floating-tech-wrap" style={{ "--bubble-index": idx }}>
                <span className={`floating-tech tone-${tag.tone}`}>{tag.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span className="stat-label">Available</span>
          <strong>{availableCourses}</strong>
          <p>Fresh opportunities ready to explore.</p>
        </article>
        <article className="stat-card">
          <span className="stat-label">Enrolled</span>
          <strong>{enrolledCount}</strong>
          <p>Courses already added to your learning path.</p>
        </article>
        <article className="stat-card">
          <span className="stat-label">Next up</span>
          <strong>{remainingCount}</strong>
          <p>Courses still waiting for your first click.</p>
        </article>
      </div>

      <section className="content-section dashboard-section marketplace-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learning library</p>
            <h2 className="section-title-gradient">Explore Top Courses</h2>
          </div>
          <p className="helper-text">Browse practical topics and enroll from the same screen.</p>
        </div>

        {message ? <p className="success-text banner-message">{message}</p> : null}
        {error ? <p className="error-text banner-message">{error}</p> : null}

        {!courses.length ? (
          <div className="empty-state empty-state-large">
            <h2>No courses available yet</h2>
            <p>
              {user?.role === "admin"
                ? "Use the Add New Course button to publish the first course."
                : "Courses will appear here as soon as an admin adds them."}
            </p>
          </div>
        ) : null}

        <div className="course-grid">
          {courses.map((course, index) => {
            const isEnrolled = enrolledCourseIds.has(course._id);
            const skillTags = getSkillTags(course.title, course.description);

            return (
              <article key={course._id} className="course-card dashboard-course-card marketplace-card">
                <div className="course-card-header marketplace-card-header">
                  <span className="pill">{course.duration}</span>
                  <span className={isEnrolled ? "status-tag enrolled" : "status-tag open"}>
                    {isEnrolled ? "Enrolled" : "Open"}
                  </span>
                </div>
                <div className="course-card-body">
                  <h3>{course.title}</h3>
                  <p className="instructor-line">{course.instructor}</p>
                  <div className="rating-row">
                    <span className="stars">★★★★★</span>
                    <span>4.8</span>
                  </div>
                  <div className="skill-tiles">
                    {skillTags.map((tag) => (
                      <span key={tag.key} className={`skill-tile tone-${tag.tone}`}>
                        <span className="skill-avatar" aria-hidden="true">
                          <span className="skill-avatar-face" />
                        </span>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <p>{course.description}</p>
                </div>
                <div className="course-card-footer">
                  <button
                    type="button"
                    className={isEnrolled ? "secondary-button" : "primary-button"}
                    onClick={() => handleEnroll(course._id)}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default CoursesPage;
