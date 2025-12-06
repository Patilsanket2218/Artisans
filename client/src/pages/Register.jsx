import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import registerImage from "../assets/images/register-image.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://artisans-2uw2.onrender.com/api/users/register",
        {
          name: fullName,
          email,
          password,
          role,
          ...(role === "seller" && { storeName, storeDescription }),
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setSuccessMessage("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate(user.role === "seller" ? "/seller-dashboard" : "/profile");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3 py-3">
      <div
        className="row shadow-lg rounded-5 overflow-hidden w-100"
        style={{ maxWidth: "900px", minHeight: "550px" }}
      >
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={registerImage}
            alt="Register"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
          <h2 className="text-center mb-4" style={{ color: "#6F1D1D", fontWeight: "700" }}>
            Create Account
          </h2>

          {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="form-control shadow-sm"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
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

            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control shadow-sm"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label fw-semibold">Role</label>
              <select
                id="role"
                className="form-select shadow-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {role === "seller" && (
              <>
                <div className="mb-3">
                  <label htmlFor="storeName" className="form-label fw-semibold">Store Name</label>
                  <input
                    type="text"
                    id="storeName"
                    className="form-control shadow-sm"
                    placeholder="Enter store name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="storeDescription" className="form-label fw-semibold">Store Description</label>
                  <textarea
                    id="storeDescription"
                    className="form-control shadow-sm"
                    rows="3"
                    placeholder="Enter store description"
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn w-100 py-2"
              style={{ backgroundColor: "#6F1D1D", color: "#fff", fontWeight: "600" }}
              disabled={loading}
            >
              {loading ? <span className="spinner-border spinner-border-sm"></span> : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="fw-bold" style={{ color: "#6F1D1D" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
