import type { IClient } from "./IClient.ts";
import type { IProduct } from "./IProduct.ts";
import type { IUser } from "./IUser.ts";
import type { IZone } from "./IZone.ts";

export interface ISaleReport {
  title: String;
  clientId: IClient;
  salesPersonId: IUser;
  zoneId: IZone;
  products: [
    {
      productId: IProduct;
      qty: number;
    },
  ];
  totalAmount: number;
  expectedCloseDate: Date;
  status: string;
  probability: number;
  notes: String;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}
