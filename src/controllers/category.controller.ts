import type { Request, Response } from "express";
import { Category } from "../models/Category.model.ts";

// READ ALL
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};