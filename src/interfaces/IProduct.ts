import type { ICategory } from "./ICategory.ts";

export interface IProduct {
    name: string;
    sku: string;
    categoryId: ICategory;
    unitPrice: number;
    costPrice: number;
    active: boolean;
  }
  