import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../types/utility.js";
import { controllerType } from "../types/user.js";
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error",
  err.statusCode = err.statusCode || 500
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export const tryCatch =
  (func: controllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
