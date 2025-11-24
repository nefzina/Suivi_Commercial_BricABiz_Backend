import type { ICategory } from "./ICategory.ts";

export interface IProduct {
    name: string;
    sku: string;
    category: ICategory;
    unitPrice: number;
    costPrice: number;
    active: boolean;
  }
  