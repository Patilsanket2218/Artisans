import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white pt-5 pb-3"
      style={{
        backgroundColor: "#772b2bff", // Darker, modern background
        borderTop: "4px solid #AD8B73", // Accent color
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3" style={{ color: "#AD8B73", fontWeight: "600" }}>
              ShopEase
            </h5>
            <p style={{ lineHeight: "1.8", fontSize: "0.95rem", color: "#ccc" }}>
              Discover unique handcrafted goods and support small businesses.
              Quality and creativity delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3" style={{ color: "#AD8B73", fontWeight: "600" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled">
              {["About Us", "Products", "Contact Us", "FAQs"].map((link, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={`/${link.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-white text-decoration-none"
                    style={{ fontSize: "0.95rem", transition: "0.3s" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h5 className="mb-3" style={{ color: "#AD8B73", fontWeight: "600" }}>
              Follow Us
            </h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 hover-scale">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 hover-scale">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 hover-scale">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5 hover-scale">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#444" }} />

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="mb-0" style={{ fontSize: "0.85rem", color: "#ccc" }}>
            &copy; 2025 ShopEase. All Rights Reserved. |{" "}
            <a href="/terms" className="text-white text-decoration-none hover-underline">
              Terms of Service
            </a>{" "}
            |{" "}
            <a href="/privacy" className="text-white text-decoration-none hover-underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.2);
            transition: 0.3s;
          }
          .hover-underline:hover {
            text-decoration: underline;
            transition: 0.3s;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
