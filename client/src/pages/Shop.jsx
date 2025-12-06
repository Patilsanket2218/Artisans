import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import categoriesData from "../data/categories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");

  const API_URL = "https://artisans-2uw2.onrender.com/";

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  // FILTER HANDLING
  useEffect(() => {
    let updated = products;

    if (selectedCategory !== "All") {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubCategory) {
      updated = updated.filter((p) => p.subcategory === selectedSubCategory);
    }

    if (selectedPrice !== "All") {
      const [min, max] = selectedPrice.split("-").map(Number);
      updated = updated.filter((p) => p.price >= min && p.price <= max);
    }

    if (selectedRating !== "All") {
      updated = updated.filter(
        (p) => Math.round(p.rating) === parseInt(selectedRating)
      );
    }

    setFilteredProducts(updated);
  }, [selectedCategory, selectedSubCategory, selectedPrice, selectedRating, products]);

  const addToWishlist = async (product) => {
    if (!user) return toast.warn("Please login first!");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/users/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(`${product.title} added to wishlist!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F3EF" }}>
      <Navbar />
      <ToastContainer autoClose={3000} />

      {/* HERO SECTION */}
      <section
        style={{
          padding: "120px 20px",
          textAlign: "center",
          background: "linear-gradient(120deg, #6F1D1D, #B55B45)",
          color: "white",
        }}
      >
        <h1 className="fw-bold display-4">Discover Handcrafted Excellence</h1>
        <p style={{ fontSize: "1.2rem", opacity: "0.9", marginTop: "10px" }}>
          Shop unique handmade products crafted with passion and precision.
        </p>

        <svg
          style={{ position: "absolute", bottom: "-1px", left: "0" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 300"
        >
          <path
            fill="#F7F3EF"
            d="M0,256L80,224C160,192,320,128,480,122.7C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192V0H0Z"
          />
        </svg>
      </section>

      <div className="container py-5">
        <div className="row">
          {/* FILTER SIDEBAR */}
          <div className="col-md-3 mb-4">
            <div
              className="p-4 shadow-sm"
              style={{
                borderRadius: "18px",
                background: "white",
                position: "sticky",
                top: "110px",
              }}
            >
              <h4 className="fw-bold mb-3" style={{ color: "#6F1D1D" }}>
                Filters
              </h4>

              <label className="fw-semibold">Category</label>
              <select
                className="form-select mb-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                {categoriesData.map((cat) => (
                  <option key={cat.name}>{cat.name}</option>
                ))}
              </select>

              {selectedCategory !== "All" &&
                categoriesData.find((c) => c.name === selectedCategory)?.subcategories.length >
                0 && (
                  <>
                    <label className="fw-semibold">Subcategory</label>
                    <select
                      className="form-select mb-3"
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                      <option value="">All</option>
                      {categoriesData
                        .find((c) => c.name === selectedCategory)
                        ?.subcategories.map((sub) => (
                          <option key={sub}>{sub}</option>
                        ))}
                    </select>
                  </>
                )}

              <label className="fw-semibold">Price</label>
              <select
                className="form-select mb-3"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <option value="All">All</option>
                <option value="0-500">₹0 - ₹500</option>
                <option value="501-1000">₹501 - ₹1000</option>
                <option value="1001-2000">₹1001 - ₹2000</option>
                <option value="2001-5000">₹2001 - ₹5000</option>
              </select>

              <label className="fw-semibold">Rating</label>
              <select
                className="form-select"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="All">All</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="col-md-9">
            <h2 className="fw-bold mb-4" style={{ color: "#6F1D1D" }}>
              Our Products
            </h2>

            <div className="row g-4">
              {filteredProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div className="col-md-4" key={product._id}>
                    <div
                      className="shadow-sm p-3 rounded-4 h-100"
                      style={{
                        background: "#ffffff",
                        transition: "0.25s",
                        border: "1px solid #eee",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <img
                        src={`https://artisans-2uw2.onrender.com/uploads/${product.images[0]}`}
                        className="rounded-3"
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                        }}
                        alt={product.title}
                      />

                      <h5 className="fw-bold mt-3">{product.title}</h5>

                      <p className="text-muted small">
                        {product.description.length > 60
                          ? product.description.slice(0, 60) + "..."
                          : product.description}
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-primary">₹{product.price}</span>
                        <span className="text-warning">⭐ {product.rating}</span>
                      </div>

                      <button
                        className="btn btn-outline-danger w-100 mt-3"
                        onClick={() => addToWishlist(product)}
                      >
                        ❤️ Add to Wishlist
                      </button>

                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-dark w-100 mt-2 rounded-pill"
                        style={{ backgroundColor: "#6F1D1D", borderColor: "#6F1D1D" }}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
