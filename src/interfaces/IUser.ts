import type { IZone } from "./IZone.ts";

export interface IUser {
  name: string;
  email: string;
  role: string;
  zoneId: IZone;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
