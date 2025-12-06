import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../assets/images/hero.jpg";
import { Link } from "react-router-dom";
import CategorySection from "../Components/CategorySection";
import "./landing.css"; // We'll add some unique CSS here

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const API_URL = "https://artisans-fawn.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://artisans-2uw2.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };
    fetchData();
  }, []);

  const addToWishlist = async (product) => {
    if (!user) return toast.warn("Please login to add items to wishlist!");
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login again.");
      const response = await fetch(`${API_URL}/api/users/wishlist/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: product._id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      {/* HERO SECTION WITH PARALLAX */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Crafted With Love, Made for You</h1>
            <p>Discover unique handcrafted pieces by talented artisans. Every item tells a story.</p>
            <Link to="/shop" className="hero-btn">
              Explore Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY CAROUSEL */}
      <CategorySection products={products} />

      {/* FEATURED PRODUCTS */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Featured Handcrafted Goods</h2>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-secondary"></div>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={`https://artisans-2uw2.onrender.com/uploads/${product.images[0]}`}
                    alt={product.title}
                  />
                  <div className="product-info">
                    <h5>{product.name}</h5>
                    <p className="product-price">₹{product.price}</p>
                    <div className="product-buttons">
                      <button onClick={() => addToWishlist(product)}>❤️ Wishlist</button>
                      <Link to={`/product/${product._id}`} className="view-btn">View →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Artisan's Haven?</h2>
          <div className="features-grid">
            {[
              { icon: "🧵", title: "Handcrafted Quality", text: "Every item is handmade with love." },
              { icon: "🌍", title: "Ethically Sourced", text: "Support small artisans and sustainable creations." },
              { icon: "🚚", title: "Fast Delivery", text: "Quick and safe delivery to your doorstep." },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h5>{f.title}</h5>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
