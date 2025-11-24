import { timeStamp } from "console";
import mongoose from "mongoose";
import { trim } from "validator";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "PLease Enter the Name"],
    },
    photo: {
      type: String,
      required: [true, "Please uplaod the photo"],
    },
    price: {
      type: String,
      required: [true, "Please Enter the price of product"],
    },
    category: {
      type: String,
      require: [true, "Please enter the category of the product"],
      trim: true,
    },
    stock: {
      type: String,
      require: [true, "Please Enter the stock of the products"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
