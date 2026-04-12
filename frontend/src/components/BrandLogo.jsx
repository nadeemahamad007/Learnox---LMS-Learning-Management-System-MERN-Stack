import { Link } from "react-router-dom";

function BrandLogo({ to = "/", compact = false, className = "" }) {
  return (
    <Link to={to} className={`brand brand-link ${className}`.trim()}>
      <span className="brand-mark brand-mark-logo">
        <span className="brand-orbit" />
        <span className="brand-core">Lx</span>
      </span>
      <span className="brand-text-group">
        <span className="brand-name">Learnox</span>
        {!compact ? <span className="brand-tagline">Smart learning studio</span> : null}
      </span>
    </Link>
  );
}

export default BrandLogo;
