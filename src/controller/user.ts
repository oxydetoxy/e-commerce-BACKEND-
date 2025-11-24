import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { newUserReqBody } from "../types/user.js";
import { tryCatch } from "../middlewares/errorHandler.js";
import ErrorHandler from "../types/utility.js";
export const newUser = tryCatch(
  async (
    req: Request<{}, {}, newUserReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, gender, _id, dob, photo } = req.body;

    if (!_id || !gender || !dob || !email || !photo || !name) {
      return next(
        new ErrorHandler("please fill the all information first", 400)
      );
    }

    let user = await User.findById(_id);

    if (!user) {
      user = await User.create({
        name,
        email,
        gender,
        _id,
        dob,
        photo,
      });

      return res.status(200).json({
        success: true,
        message: `Account Created  ${user.name}`,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `${user.name} already exist`,
      });
    }
  }
);

export const getAllUser = tryCatch(async (req, res, next) => {
  const allUser = await User.find({});

  return res.status(200).json({
    success: true,
    allUser,
  });
});

export const getUser = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const getUser = await User.findById(id);

  if (!getUser) {
    return next(new ErrorHandler("No user found with this id ", 400));
  }
  return res.status(200).json({
    success: true,
    getUser,
  });
});

export const deleteUser = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const userToDelete = await User.findById(id);
  if (!userToDelete) {
    return next(new ErrorHandler("No user found with this id ", 400));
  }
  await userToDelete.deleteOne();
  return res.status(200).json({
    success: true,
    message: `${userToDelete.name} your account has been deleted`,
  });
});
