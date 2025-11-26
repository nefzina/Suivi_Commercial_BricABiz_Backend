import { Schema, model } from "mongoose";
import type { ICategory } from "../interfaces/ICategory.ts";

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

export const Category = model<ICategory>("Category", CategorySchema);
