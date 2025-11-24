import type { IUser } from "./IUser.ts";

export interface IClient {
  name: String;
  vatNumber: String;
  address: { city: String; postalCode: String; country: String };
  assignedTo: IUser;
  createdAt: Date;
  tags: [String];
}
