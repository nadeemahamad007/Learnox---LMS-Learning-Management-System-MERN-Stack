import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";
import { heroVisual } from "../courseVisuals";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      await login(formData);
      navigate("/courses");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-showcase">
        <BrandLogo className="showcase-brand" />
        <span className="hero-pill">New features available</span>
        <p className="eyebrow">Welcome back</p>
        <h1 className="marketplace-title">Build amazing learning experiences.</h1>
        <p className="auth-description">
          Access your course library, revisit enrolled programs, and continue building your next
          skill journey with Learnox.
        </p>
        <div className="hero-points auth-points">
          <span>Easy to use</span>
          <span>Fast and secure</span>
          <span>24/7 support</span>
          <span>Fresh updates</span>
        </div>
        <div className="auth-visual-shell">
          <img src={heroVisual} alt="Learnox login visual" className="auth-visual-image" />
        </div>
      </div>

      <section className="auth-card auth-card-large">
        <div className="auth-card-header">
          <p className="eyebrow">Sign in</p>
          <h2>Login to your dashboard</h2>
          <p className="helper-text">Use your registered email and password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
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
              placeholder="Enter your password"
              required
            />
          </label>
          {error ? <p className="error-text banner-message">{error}</p> : null}
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
          <button type="button" className="secondary-button" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p className="helper-text">
            Don&apos;t have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </section>
    </section>
  );
}

export default LoginPage;
