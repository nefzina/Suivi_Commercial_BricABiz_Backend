import type { Request, Response } from "express";
import { Product } from "../models/Product.model.ts";

// READ ALL
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.json(product);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
