import { Schema, model } from "mongoose";
import type { IUser } from "../interfaces/IUser.ts";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["commercial", "manager"],
      default: "commercial",
    },
    zoneId: { type: Schema.Types.ObjectId, ref: "Zone" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", UserSchema);
