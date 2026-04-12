import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/client";
import BrandLogo from "../components/BrandLogo";
import { heroVisual } from "../courseVisuals";
import learningBoy from "../assets/learning-boy.avif";

function EnrolledCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  const heroSkillTags = (courses.length ? courses : [{ title: "", description: "" }])
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

  useEffect(() => {
    const loadEnrolledCourses = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/enroll/my-courses");
        setCourses(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    loadEnrolledCourses();
  }, []);

  if (loading) {
    return <p className="status-message">Loading enrolled courses...</p>;
  }

  return (
    <section className="dashboard-stack">
      <div className="dashboard-hero learning-hero">
        <div className="hero-copy">
          <BrandLogo className="hero-brand" />
          <span className="hero-pill">My active library</span>
          <p className="eyebrow">My learning</p>
          <h1 className="marketplace-title">Stay focused on what you have started</h1>
          <p className="hero-text">
            Revisit enrolled courses, track your active learning list, and keep a clean view of
            your progress-ready catalog.
          </p>
          <div className="hero-points">
            <span>Saved course list</span>
            <span>Quick revisit</span>
            <span>Clean layout</span>
            <span>Progress-ready</span>
          </div>
        </div>

        <div className="hero-visual-card">
          <img src={heroVisual} alt="Learning dashboard visual" className="hero-visual-image" />
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

      <section className="content-section dashboard-section marketplace-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Enrolled courses</p>
            <h2 className="section-title-gradient">Your Enrolled Courses</h2>
          </div>
          <Link to="/courses" className="secondary-button inline-action">
            Browse More Courses
          </Link>
        </div>

        {error ? <p className="error-text banner-message">{error}</p> : null}

        {!courses.length && !error ? (
          <div className="empty-state empty-state-large">
            <h2>No courses enrolled yet</h2>
            <p>Visit the courses page to start learning.</p>
            <Link to="/courses" className="primary-button inline-action">
              Browse Courses
            </Link>
          </div>
        ) : null}

        <div className="course-grid">
          {courses.map((course, index) => {
            const skillTags = getSkillTags(course.title, course.description);

            return (
            <article key={course.enrollmentId} className="course-card dashboard-course-card marketplace-card enrolled-card">
              <div className="course-card-header marketplace-card-header">
                <span className="pill">{course.duration}</span>
                <span className="status-tag enrolled">Enrolled</span>
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
                <span className="status-tag enrolled">Learning now</span>
                <p className="helper-text">Enrolled on {new Date(course.enrolledAt).toLocaleDateString()}</p>
              </div>
            </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default EnrolledCoursesPage;
