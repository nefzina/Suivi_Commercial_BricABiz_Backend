import { Schema, model } from "mongoose";
import type { ISaleReport } from "../interfaces/ISalesReport.ts";
import { SalesReportStatus } from "../interfaces/ReportStatuses.ts";

const SalesReportSchema = new Schema<ISaleReport>(
  {
    title: String,
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    salesPersonId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // commercial
    zoneId: { type: Schema.Types.ObjectId, ref: "Zone" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
      },
    ],
    totalAmount: { type: Number, required: true }, // qty * unitPrice
    expectedCloseDate: Date, // date de prévision de la clôture
    status: {
      type: String,
      enum: SalesReportStatus,
      default: "lead",
    },
    probability: { type: Number, min: 0, max: 100 }, // % pour la projection
    notes: String,
    source: { type: String }, // ex: "import-csv", "manual"
  },
  { timestamps: true },
);

export const SalesReport = model<ISaleReport>("SalesReport", SalesReportSchema);
