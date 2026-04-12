import { NavLink, useNavigate } from "react-router-dom";

import BrandLogo from "./BrandLogo";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <BrandLogo compact />
      <nav className="nav-links nav-links-shell">
        {isAuthenticated ? (
          <>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/enrolled">My Learning</NavLink>
            {user?.role === "admin" ? <NavLink to="/admin/courses/new">Add Course</NavLink> : null}
          </>
        ) : (
          <>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </nav>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="user-chip">
              {user?.name} ({user?.role})
            </span>
            <button type="button" className="nav-login-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button type="button" className="nav-login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
