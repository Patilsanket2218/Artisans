import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "https://artisans-2uw2.onrender.com/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage("Your message has been sent!");
        setErrorMessage("");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
    } catch {
      setErrorMessage("Failed to send message. Check your internet.");
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ backgroundColor: "#FFF8F2" }}>
      <Navbar />

      {/* HERO SECTION */}
      <section
        style={{
          padding: "120px 20px 160px",
          background: "linear-gradient(135deg, #6F1D1D, #AD4C4C)",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Text */}
        <div style={{ position: "relative", zIndex: 5 }}>
          <h1 className="fw-bold display-4">Contact Us</h1>
          <p className="lead" style={{ opacity: 0.9 }}>
            We're here to help and listen to you.
          </p>
        </div>

        {/* Floating shapes */}
        <div
          style={{
            width: "70px",
            height: "70px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "15px",
            position: "absolute",
            top: "40px",
            left: "60px",
            transform: "rotate(20deg)",
            zIndex: 2,
          }}
        ></div>
        <div
          style={{
            width: "90px",
            height: "90px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
            position: "absolute",
            top: "120px",
            right: "80px",
            zIndex: 2,
          }}
        ></div>

        {/* Wavy SVG */}
        <svg
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            zIndex: 1,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#311101ff"
            d="M0,192L60,170.7C120,149,240,107,360,117.3C480,128,600,192,720,224C840,256,960,256,1080,234.7C1200,213,1320,171,1380,149.3L1440,128V0H0Z"
          ></path>
        </svg>
      </section>

      {/* CONTACT SECTION */}
      <section className="container py-5">
        <div className="row gy-4">
          {/* FORM */}
          <div className="col-md-6">
            <div
              className="shadow-lg p-4 rounded-4"
              style={{ background: "white" }}
            >
              <h4 className="text-center mb-4" style={{ color: "#7A1F1F" }}>
                Send Us a Message
              </h4>

              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <button
                  className="btn w-100 rounded-pill"
                  style={{
                    backgroundColor: "#6F1D1D",
                    color: "white",
                    padding: "10px",
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="col-md-6">
            <div
              className="shadow-lg p-4 rounded-4"
              style={{ background: "white" }}
            >
              <h4 className="text-center mb-4" style={{ color: "#7A1F1F" }}>
                Contact Information
              </h4>

              <p className="mb-3">
                📍 <strong>Address:</strong> 1234 Artisan Street, Mumbai, India
              </p>

              <p className="mb-3">
                📞 <strong>Phone:</strong> +91 9876543210
              </p>

              <p className="mb-3">
                ✉️ <strong>Email:</strong> support@artisans.com
              </p>

              <h5 className="text-center mt-4" style={{ color: "#6F1D1D" }}>
                Connect With Us
              </h5>

              <div className="d-flex justify-content-center gap-3 mt-2">
                <i className="fab fa-facebook fs-4 text-dark"></i>
                <i className="fab fa-twitter fs-4 text-dark"></i>
                <i className="fab fa-instagram fs-4 text-dark"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
