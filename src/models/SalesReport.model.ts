import { Schema, model } from "mongoose";
import type { ISaleReport } from "../interfaces/ISalesReport.ts";

const SalesReportSchema = new Schema<ISaleReport>({
  title: String, // ex: "Vente 1000 aspirateurs - Client XYZ"
  clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  salesPersonId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // commercial
  zoneId: { type: Schema.Types.ObjectId, ref: "Zone" },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
      unitSellingPrice: Number, // override du prix catalogue
    },
  ],
  totalAmount: { type: Number, required: true }, // qty * unitPrice
  expectedCloseDate: Date, // date de prévision de la clôture
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  status: {
    type: String,
    enum: ["lead", "qualified", "proposal", "won", "lost"],
    default: "lead",
  },
  probability: { type: Number, min: 0, max: 100 }, // % pour la projection
  notes: String,
  source: { type: String }, // ex: "import-csv", "manual"
});

export const SalesReport = model<ISaleReport>("SalesReport", SalesReportSchema);

