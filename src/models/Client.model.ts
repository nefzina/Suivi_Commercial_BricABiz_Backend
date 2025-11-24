import { Schema, model } from "mongoose";
import type { IClient } from "../interfaces/IClient.ts";

const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  vatNumber: { type: String, required: true },  // numéro de TVA intracommunautaire
  address: { city: String, postalCode: String, country: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // commercial owner
  createdAt: Date,
  tags: [String], // Important, Grand compte, PME, Risque, Nouveau, Inactif
});

export const Client = model<IClient>("Client", ClientSchema);
