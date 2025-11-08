import express from "express";
import { newUser } from "../controller/user.js";
const app = express.Router();
app.post('/new', newUser);
export default app;
