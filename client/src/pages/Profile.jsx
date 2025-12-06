import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Defaultimage from "../assets/images/defaultimage.jpg";
import "../assets/style/profile.css";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    profilePic: null,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://artisans-2uw2.onrender.com/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data);
        setFormData({
          name: response.data.name || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          profilePic: response.data.profilePic || null,
        });
      } catch (err) {
        toast.error("Failed to fetch profile!");
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://artisans-2uw2.onrender.com/api/users/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) setOrders(response.data.orders);
      } catch {
        toast.error("Failed to fetch orders.");
      }
    };

    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://artisans-2uw2.onrender.com/api/users/wishlist",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) setWishlist(response.data.wishlist);
      } catch {
        toast.error("Failed to fetch wishlist.");
      }
    };

    fetchUserProfile();
    fetchOrders();
    fetchWishlist();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0)
      setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "profilePic" || value instanceof File)
          formDataToSend.append(key, value);
      });
      await axios.put(
        "https://artisans-2uw2.onrender.com/api/users/editprofile",
        formDataToSend,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      toast.success("Profile updated successfully!");
      setEditing(false);
      window.location.reload();
    } catch {
      toast.error("Profile update failed!");
    }
  };

  const removeWishlistItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://artisans-2uw2.onrender.com/api/users/wishlist/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Removed from wishlist!");
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container my-5">
        <div className="row">
          {/* PROFILE CARD */}
          <div className="col-md-4">
            <div className="profile-card text-center p-4 shadow-lg rounded-4">
              <img
                src={
                  formData.profilePic instanceof File
                    ? URL.createObjectURL(formData.profilePic)
                    : user?.profilePic
                    ? `https://artisans-2uw2.onrender.com/uploads/${user.profilePic}`
                    : Defaultimage
                }
                alt="Profile"
                className="profile-img mb-3"
              />
              {editing ? (
                <input type="file" className="form-control" onChange={handleFileChange} />
              ) : (
                <>
                  <h4 className="fw-bold">{user?.name}</h4>
                  <p className="text-muted">{user?.email}</p>
                  <button
                    className="btn btn-dark btn-sm mt-2"
                    onClick={() => setEditing(true)}
                    style={{ backgroundColor: "#6F1D1D" }}
                  >
                    ✏️ Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>

          {/* PROFILE DETAILS, ORDERS, WISHLIST */}
          <div className="col-md-8">
            {/* Profile Details */}
            <div className="profile-card shadow-lg rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3">Profile Details</h5>
              <hr />
              {editing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success me-2">
                    ✅ Save
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                    ❌ Cancel
                  </button>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Full Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Phone:</strong> {user?.phone || "Not Provided"}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Address:</strong> {user?.address || "Not Provided"}</p>
                    <p><strong>Member Since:</strong> Jan 2023</p>
                  </div>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="profile-card shadow-lg rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3">📦 Order History</h5>
              <hr />
              {orders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Items</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, i) => (
                        <tr key={order._id}>
                          <td>#{order.id || i + 1}</td>
                          <td>
                            <span className={`badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{moment(order.createdAt).format("DD MMM YYYY, h:mm A")}</td>
                          <td>{order.paymentMethod}</td>
                          <td>₹{order.totalAmount.toFixed(2)}</td>
                          <td>
                            <ul className="list-unstyled mb-0">
                              {order.items.map((item) => (
                                <li key={item.product._id}>
                                  {item.product.name} × {item.quantity} — ₹
                                  {(item.product.price * item.quantity).toFixed(2)}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <Link to={`/orderbill/${order._id}`} className="btn btn-dark btn-sm">
                              🧾 Invoice
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No orders found.</p>
              )}
            </div>

            {/* Wishlist */}
            <div className="profile-card shadow-lg rounded-4 p-4">
              <h5 className="fw-bold mb-3">❤️ Saved Items</h5>
              <hr />
              {wishlist.length > 0 ? (
                <div className="row g-3">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item._id}
                      className="col-md-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="d-flex align-items-center shadow-sm p-2 rounded-3 position-relative" style={{ backgroundColor: "#fff" }}>
                        <img
                          src={`https://artisans-2uw2.onrender.com/uploads/${item.images[0]}`}
                          alt={item.name}
                          className="rounded"
                          style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                        <div className="ms-3 flex-grow-1">
                          <h6 className="mb-1 fw-bold" style={{ color: "#6F1D1D" }}>{item.name}</h6>
                          <p className="mb-0 text-danger fw-bold">₹{item.price.toFixed(2)}</p>
                        </div>
                        <FaTrash
                          onClick={() => removeWishlistItem(item._id)}
                          size={18}
                          color="#6F1D1D"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center">No saved items.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
