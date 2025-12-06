import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/images/login-image.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://artisans-2uw2.onrender.com/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "seller":
          navigate("/seller-dashboard");
          break;
        default:
          navigate("/profile");
          break;
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3 py-3">
      <div
        className="row shadow-lg rounded-5 overflow-hidden w-100"
        style={{ maxWidth: "900px", minHeight: "500px" }}
      >
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImage}
            alt="Login"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
          <h2 className="text-center mb-4" style={{ color: "#6F1D1D", fontWeight: "700" }}>
            Welcome Back
          </h2>

          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control shadow-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control shadow-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer", fontSize: "18px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="text-decoration-none" style={{ color: "#6F1D1D" }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-100 py-2"
              style={{ backgroundColor: "#6F1D1D", color: "#fff", fontWeight: "600" }}
              disabled={loading}
            >
              {loading ? <span className="spinner-border spinner-border-sm"></span> : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <span>Don't have an account? </span>
            <Link to="/register" className="fw-bold" style={{ color: "#6F1D1D" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
