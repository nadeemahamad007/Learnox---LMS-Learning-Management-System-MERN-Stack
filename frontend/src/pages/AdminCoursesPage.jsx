import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/client";
import BrandLogo from "../components/BrandLogo";
import { heroVisual } from "../courseVisuals";
import learningBoy from "../assets/learning-boy.avif";

const initialFormState = {
  title: "",
  description: "",
  instructor: "",
  duration: ""
};

function AdminCoursesPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [restoringDemo, setRestoringDemo] = useState(false);
  const heroSkillTags = [
    { key: "node", label: "Node", tone: "sky" },
    { key: "sql", label: "SQL", tone: "sun" },
    { key: "mongo", label: "Mongo", tone: "mint" },
    { key: "html", label: "HTML", tone: "coral" },
    { key: "css", label: "CSS", tone: "sky" },
    { key: "react", label: "React", tone: "indigo" },
    { key: "py", label: "Py", tone: "coral" },
    { key: "ai", label: "AI", tone: "violet" },
    { key: "js", label: "JS", tone: "sun" },
    { key: "ml", label: "ML", tone: "sky" }
  ];

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      await api.post("/courses", formData);
      setSuccessMessage("Course created successfully. It is now available in the catalog.");
      setFormData(initialFormState);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestoreDemoCourses = async () => {
    setError("");
    setSuccessMessage("");
    setRestoringDemo(true);

    try {
      const response = await api.post("/courses/seed");
      setSuccessMessage(response.data.message);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to restore demo courses");
    } finally {
      setRestoringDemo(false);
    }
  };

  return (
    <section className="dashboard-stack">
      <div className="dashboard-hero admin-hero">
        <div className="hero-copy">
          <BrandLogo className="hero-brand" />
          <span className="hero-pill">Admin publishing studio</span>
          <p className="eyebrow">Admin panel</p>
          <h1 className="marketplace-title">Publish courses with a marketplace-ready look.</h1>
          <p className="hero-text">
            Add polished learning content, make it instantly visible to students, and keep your Learnox
            catalog fresh directly from the dashboard.
          </p>
          <div className="hero-points">
            <span>Admin only</span>
            <span>Quick publishing</span>
            <span>Catalog ready</span>
            <span>Clean structure</span>
          </div>
        </div>

        <div className="hero-visual-card">
          <img src={heroVisual} alt="Course publishing visual" className="hero-visual-image" />
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
            <p className="eyebrow">Course studio</p>
            <h2 className="section-title-gradient">Create a New Course</h2>
          </div>
          <div className="hero-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleRestoreDemoCourses}
              disabled={restoringDemo}
            >
              {restoringDemo ? "Restoring..." : "Restore Demo Courses"}
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate("/courses")}>
              Back to Courses
            </button>
          </div>
        </div>

        <div className="admin-layout admin-layout-polished">
          <div className="admin-intro">
            <h3>Publish courses directly from the dashboard</h3>
            <p>
              Add the title, description, instructor, and duration to make new learning content
              immediately visible to students.
            </p>
            <div className="admin-tips">
              <p>Suggested duration examples:</p>
              <p>`6 weeks`, `12 hours`, `Self-paced`, `8 modules`</p>
            </div>
            <div className="admin-tips">
              <p>Strong course titles:</p>
              <p>`Data Analytics with SQL`, `AI Fundamentals`, `React for Beginners`</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form-grid admin-form-card">
            <div className="auth-card-header">
              <p className="eyebrow">Publishing form</p>
              <h3>Course details</h3>
              <p className="helper-text">
                Create a course that looks clean in the catalog and is easy for students to scan.
              </p>
            </div>

            <label>
              Course title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Machine Learning Basics"
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe what students will learn."
                rows="5"
                required
              />
            </label>
            <div className="split-grid">
              <label>
                Instructor
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="Priya Sharma"
                  required
                />
              </label>
              <label>
                Duration
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="6 weeks"
                  required
                />
              </label>
            </div>
            {successMessage ? <p className="success-text banner-message">{successMessage}</p> : null}
            {error ? <p className="error-text banner-message">{error}</p> : null}
            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Creating course..." : "Create Course"}
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default AdminCoursesPage;
