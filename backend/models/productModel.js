import mongoose from "mongoose";
import ObjectId from "./categoriesModel";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);

export default product;
