import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";

// IMPORT ROUTES
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// IMPORT MIDDLEWARE
import errorsMiddleware from "./middlewares/errors.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({ path: "backend/config/config.env" });

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

//Connect to Database
connectDatabase();

//Register express.json
app.use(express.json());
app.use(cookieParser());

// Register Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", reviewRoutes);

// Register Middleware
app.use(errorsMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// HANDLE UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err) => {
  console.log("Error:", err);
  console.log("Shutting down server due to unhandled promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
