import { Router } from "express";
import {
  getCA,
  getCABySalesPerson,
  getCAByZone,
  getNbSells,
  getSellsPerProduct,
} from "../controllers/dashboard.controller.ts";
import {
  createSalesReport,
  getAllSalesReports,
  getSalesReportById,
  updateSalesReport,
} from "../controllers/salesReport.controller.ts";

const salesReportRoutes = Router();


salesReportRoutes.get("/salesReports/ca", getCA);
salesReportRoutes.get("/salesReports/ca/zone", getCAByZone);
salesReportRoutes.get("/salesReports/ca/salesperson", getCABySalesPerson);
salesReportRoutes.get("/salesReports/nbsells", getNbSells);
salesReportRoutes.get("/salesReports/sells/product", getSellsPerProduct);

salesReportRoutes.get("/salesReports", getAllSalesReports);
salesReportRoutes.get("/salesReports/:id", getSalesReportById);
salesReportRoutes.post("/salesReports", createSalesReport);
salesReportRoutes.put("/salesReports/:id", updateSalesReport);

export default salesReportRoutes;
