import { Schema, model } from "mongoose";
import type { IProduct } from "../interfaces/IProduct.ts";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    sku: { type: String, index: true }, // Stock-Keeping-Unit
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    unitPrice: { type: Number, required: true },
    costPrice: { type: Number, required: true }, // prix d'achat / cout de fabrication ou de developpement
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = model<IProduct>("Product", ProductSchema);
