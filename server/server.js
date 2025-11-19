import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/Connection.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import reportRoutes from "./routes/sellerreportRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// ⭐ FIX: Proper CORS setup
app.use(
  cors({
    origin: [
      "https://artisans-9zib.vercel.app", // frontend
      "http://localhost:3000", // local dev (optional)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database Connection
connectDB();

// ⭐ Default Route to check server is working
app.get("/", (req, res) => {
  res.send("✅ Artisans Backend Server is Running Successfully!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/seller", dashboardRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/salesreport", reportRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
