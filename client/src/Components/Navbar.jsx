import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style/navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm sticky-top"
      style={{ backgroundColor: "#fff", borderBottom: "2px solid #AD8B73" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "#6D2323", fontSize: "1.5rem" }}
        >
          Artisan <span style={{ color: "#AD8B73" }}>Shop</span>
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {["Home", "About", "Shop", "Contact Us"].map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "")}`
                  }
                  className="nav-link px-3 py-2"
                  style={{ color: "#6D2323", fontWeight: "500" }}
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* Wishlist */}
            <li className="nav-item">
              <Link
                to="/wishlist"
                className="btn ms-2 px-3 py-2 d-flex align-items-center"
                style={{
                  backgroundColor: "#E3CAA5",
                  color: "#6D2323",
                  border: "none",
                  fontWeight: "500",
                }}
              >
                <i className="fas fa-heart me-1"></i> Wishlist
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link
                to="/cart"
                className="btn ms-2 px-3 py-2 d-flex align-items-center"
                style={{
                  backgroundColor: "#FFFBE9",
                  color: "#6D2323",
                  border: "none",
                  fontWeight: "500",
                }}
              >
                <i className="fas fa-shopping-cart me-1"></i> Cart
              </Link>
            </li>

            {/* Login / Profile */}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn ms-2 px-4 py-2"
                  style={{
                    backgroundColor: "#A31D1D",
                    color: "#FEF9E1",
                    border: "none",
                  }}
                >
                  <i className="fas fa-user-circle me-1"></i> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn ms-2 px-4 py-2 dropdown-toggle"
                  onClick={toggleDropdown}
                  style={{
                    backgroundColor: "#004D40",
                    color: "#FEF9E1",
                    border: "none",
                  }}
                >
                  <i className="fas fa-user-circle me-1"></i> Profile
                </button>

                {dropdownOpen && (
                  <ul
                    className="dropdown-menu show mt-2"
                    style={{
                      position: "absolute",
                      right: 0,
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      padding: "10px",
                      minWidth: "160px",
                      zIndex: 1000,
                    }}
                  >
                    <li>
                      <Link className="dropdown-item py-2" to="/profile">
                        <i className="fas fa-user me-2"></i> My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item py-2"
                        onClick={logout}
                        style={{ color: "#A31D1D" }}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
