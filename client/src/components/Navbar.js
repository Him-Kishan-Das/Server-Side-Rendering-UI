import React from "react";
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="/" className="logo-link">
              SSR-UI
            </a>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link" >
              Home
            </a>
            <a href="/forms" className="nav-link">
              Form
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
