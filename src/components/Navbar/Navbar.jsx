import "./Navbar.css";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <a href="/" className="logo" aria-label="XLChess homepage">
          <span className="logo-icon">♞</span>
          <span className="logo-text">XLChess</span>
        </a>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <a href="#analysis" onClick={() => setMenuOpen(false)}>
            AI Analysis
          </a>
          <a href="#community" onClick={() => setMenuOpen(false)}>
            Community
          </a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
        </nav>

        <div className={`nav-actions ${menuOpen ? "open" : ""}`}>
          <button className="btn-login" type="button" onClick={() => setMenuOpen(false)}>
            Login
          </button>

          <button className="btn-primary" type="button" onClick={() => setMenuOpen(false)}>
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;