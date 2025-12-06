import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://artisans-2uw2.onrender.com/api/users/wishlist/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) setWishlist(response.data.wishlist);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://artisans-2uw2.onrender.com/api/users/wishlist/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Item removed from wishlist!");
      } else toast.error("Failed to remove item.");
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      {/* HERO SECTION */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          background: "linear-gradient(120deg, #6F1D1D, #B55B45)",
          color: "white",
          position: "relative",
        }}
      >
        <h1 className="fw-bold display-4">My Wishlist</h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9, marginTop: "10px" }}>
          Your favorite handcrafted products in one place.
        </p>
        <svg
          style={{ position: "absolute", bottom: "-1px", left: "0" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
        >
          <path
            fill="#F7F3EF"
            d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128V0H0Z"
          />
        </svg>
      </section>

      <div className="container py-5">
        {loading ? (
          <h3 className="text-muted text-center mt-5">Loading Wishlist...</h3>
        ) : wishlist.length === 0 ? (
          <div className="text-center my-5">
            <h3 className="text-muted mb-4">Your wishlist is empty! 😢</h3>
            <Link
              to="/shop"
              className="btn px-4 py-2 fw-semibold"
              style={{ backgroundColor: "#6F1D1D", color: "white", borderRadius: "30px" }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((item) => (
              <motion.div
                key={item._id}
                className="col-md-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="card border-0 shadow-lg rounded-4 overflow-hidden h-100"
                  style={{ transition: "transform 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="position-relative">
                    <img
                      src={`https://artisans-2uw2.onrender.com/uploads/${item.images[0]}`}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                      alt={item.name}
                    />
                    <motion.div
                      className="position-absolute top-2 end-2 p-2"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item._id)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#6F1D1D",
                        borderRadius: "50%",
                      }}
                    >
                      <FaTrash color="white" />
                    </motion.div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="fw-bold" style={{ color: "#6F1D1D" }}>
                      {item.name}
                    </h5>
                    <p className="fw-bold text-danger fs-5">₹{item.price.toFixed(2)}</p>
                    <Link
                      to={`/product/${item._id}`}
                      className="btn w-100 rounded-pill"
                      style={{ backgroundColor: "#6F1D1D", color: "white" }}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
