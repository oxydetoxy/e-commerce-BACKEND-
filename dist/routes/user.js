import express from "express";
import { newUser, getAllUser, getUser, deleteUser, } from "../controller/user.js";
import { adminHandler } from "../middlewares/auth.js";
const app = express.Router();
app.post("/new", newUser);
app.get("/all", adminHandler, getAllUser);
app.get("/:id", getUser);
app.delete("/:id", adminHandler, deleteUser);
export default app;
