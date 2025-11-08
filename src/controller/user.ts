import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { newUserReqBody } from "../types/user.js";
import { tryCatch } from "../middlewares/errorHandler.js";
export const newUser = tryCatch(
  async (
    req: Request<{}, {}, newUserReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, gender, _id, dob, photo } = req.body;

    const user = await User.create({
      name,
      email,
      gender,
      _id,
      dob,
      photo,
    });

    return res.status(200).json({
      success: true,

      message: `Welcome ${user.name}`,
    });
  }
);
