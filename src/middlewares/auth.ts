import { User } from "../models/user.js";
import ErrorHandler from "../types/utility.js";
import { tryCatch } from "./errorHandler.js";

export const adminHandler = tryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Wrong user", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("No user found with this id ", 401));

  if (user.role !== "admin") {
    return next(new ErrorHandler("You dont have admin rights", 401));
  }

  next();
});
