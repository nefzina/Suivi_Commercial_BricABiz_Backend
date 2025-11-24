import { Schema, model } from "mongoose";
import type { IZone } from "../interfaces/IZone.ts";

const ZoneSchema = new Schema<IZone>({
  name: {
    type: String,
    required: true,
  },
  regionCode: String,
});

export const Zone = model<IZone>("Zone", ZoneSchema);
