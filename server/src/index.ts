import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow sending cookies or authentication headers
  })
);
app.use(helmet());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Failed to start server:", err));
