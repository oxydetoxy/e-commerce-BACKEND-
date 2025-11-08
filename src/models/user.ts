import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
// extends as document coz every model represent mongo db document so to use mongoose method
interface IUser extends Document {
  _id: string;
  name: string;
  photo: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //virtual attribute
  age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Enter Id"],
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please upload Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please Select Gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please Enter DOB"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Enter the Email"],
      validate: validator.default.isEmail, // used for validating the email use npm i validator package to for this
    },
  },
  {
    timestamps: true,
  }
);
schema.virtual("age").get(function () {
  if (!this.dob) return 0;
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() == dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<IUser>("User", schema);
