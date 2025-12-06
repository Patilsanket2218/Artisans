import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import CheckoutForm from "../Components/CheckoutForm"; // assume you exported separately

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [quantityTimeouts, setQuantityTimeouts] = useState({});
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "" });

  const authToken = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

  useEffect(() => {
    fetchUserDetails();
    fetchCartItems();
  }, [authToken, userId]);

  const fetchCartItems = async () => {
    if (!authToken || !userId) return;
    try {
      const response = await axios.get("https://artisans-2uw2.onrender.com/api/users/cart/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.success) setCartItems(response.data.cart);
    } catch {
      toast.error("Error fetching cart items");
    }
  };

  const fetchUserDetails = async () => {
    if (!authToken || !userId) return;
    try {
      const response = await axios.get(`https://artisans-2uw2.onrender.com/api/users/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data?.name) setUserName(response.data.name);
    } catch {
      toast.error("Error fetching user details");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    clearTimeout(quantityTimeouts[productId]);
    const timeout = setTimeout(() => updateQuantity(productId, newQuantity), 1000);
    setQuantityTimeouts((prev) => ({ ...prev, [productId]: timeout }));
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.post(
        `https://artisans-2uw2.onrender.com/api/users/cart/update`,
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      toast.success("Quantity updated!");
    } catch {
      toast.error("Error updating quantity");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`https://artisans-2uw2.onrender.com/api/users/cart/remove`, {
        headers: { Authorization: `Bearer ${authToken}` },
        data: { productId },
      });
      toast.success("Item removed from cart!");
      fetchCartItems();
    } catch {
      toast.error("Error removing item");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const deliveryCharge = 40;
  const totalPrice = subtotal + gst + deliveryCharge;

  const handleProceedToCheckout = () => setShowAddressModal(true);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmitAddress = async () => {
    if (!address.street || !address.city || !address.state || !address.zip) {
      return toast.error("Please enter a complete delivery address!");
    }
    try {
      const { data } = await axios.post(
        "https://artisans-2uw2.onrender.com/api/orders/create-payment-intent",
        { amount: totalPrice, customerAddress: { ...address, country: "IN" }, userName },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowAddressModal(false);
        setShowPaymentModal(true);
        toast.success("Payment initiated!");
      }
    } catch {
      toast.error("Failed to initiate payment");
    }
  };

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-gradient">
          <FaShoppingCart size={80} className="mb-3 text-primary" />
          <h2 className="fw-bold">Your Cart is Empty 😢</h2>
          <p className="text-muted">Add some amazing products to your cart!</p>
          <Link to="/shop" className="btn btn-primary btn-lg mt-3">
            🛍️ Start Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container className="py-5">
        <Row className="g-4">
          {/* Cart Items */}
          <Col lg={8}>
            <h3 className="fw-bold mb-4">Shopping Cart</h3>
            <Table responsive hover className="align-middle text-center shadow-sm rounded">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product._id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://artisans-2uw2.onrender.com/uploads/${item.product.images}`}
                        alt={item.product.name}
                        width="60"
                        className="rounded me-3 shadow-sm"
                      />
                      {item.product.name}
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="w-50 mx-auto text-center"
                        onChange={(e) =>
                          handleQuantityChange(item.product._id, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card className="p-4 shadow rounded-4 border-0">
              <h4 className="fw-bold">Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control name="street" value={address.street} onChange={handleAddressChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control name="city" value={address.city} onChange={handleAddressChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control name="state" value={address.state} onChange={handleAddressChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>ZIP</Form.Label>
              <Form.Control name="zip" value={address.zip} onChange={handleAddressChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitAddress}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                clientSecret={clientSecret}
                cartItems={cartItems}
                totalAmount={totalPrice}
                address={address}
                handleClose={() => setShowPaymentModal(false)}
              />
            </Elements>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
