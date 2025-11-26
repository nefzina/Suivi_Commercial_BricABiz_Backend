import type { IZone } from "./IZone.ts";

export interface IUser {
  fullname: string;
  email: string;
  role: string;
  zoneId: IZone;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPerformance {
  _id?: null;
  totalCA: number;
  wonSales: number;
  totalSales: number;
  conversionRate: string; // toFixed(2)
}
