import mongoose, { mongo, Schema } from "mongoose";

const schema = new mongoose.Schema(
  {
    shippingAddrss: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    shippingcharges: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      requiredd: true,
    },
    total: {
      type: Number,
      requiredd: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", schema);
