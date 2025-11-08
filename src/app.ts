import express, { NextFunction } from "express";
import userRoute from "./routes/user.js";
import mongoose, { Error } from "mongoose";
import { errorHandler } from "./middlewares/errorHandler.js";

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

const PORT = 3000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(errorHandler);

app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server   is running on port ${PORT}`);
});
