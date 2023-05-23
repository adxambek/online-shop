import * as mongoose from "mongoose";
import { Schema } from "mongoose";

export const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: String,
    amount: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // ref bu yerda userschema bilan ishlash uchun berildi
    }
  }, {
    timestamps: true
  }
);