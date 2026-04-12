import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";
import { heroVisual } from "../courseVisuals";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signup(formData);
      navigate("/courses");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-showcase auth-showcase-alt">
        <BrandLogo className="showcase-brand" />
        <span className="hero-pill">Join Learnox today</span>
        <p className="eyebrow">Get started</p>
        <h1 className="marketplace-title">Create your smart learning workspace.</h1>
        <p className="auth-description">
          Join as a student to enroll in courses or as an admin to publish new learning content
          directly from the dashboard.
        </p>
        <div className="hero-points auth-points">
          <span>Student friendly</span>
          <span>Admin ready</span>
          <span>Clean dashboard</span>
          <span>Fast setup</span>
        </div>
        <div className="auth-visual-shell">
          <img src={heroVisual} alt="Learnox signup visual" className="auth-visual-image" />
        </div>
      </div>

      <section className="auth-card auth-card-large">
        <div className="auth-card-header">
          <p className="eyebrow">Create account</p>
          <h2>Join the Learnox platform</h2>
          <p className="helper-text">Fill in your details to create a student or admin account.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </label>
          <label>
            Role
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          {error ? <p className="error-text banner-message">{error}</p> : null}
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? "Creating account..." : "Signup"}
          </button>
          <button type="button" className="secondary-button" onClick={() => navigate("/login")}>
            Login Instead
          </button>
        </form>

        <div className="auth-footer">
          <p className="helper-text">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </section>
  );
}

export default SignupPage;
