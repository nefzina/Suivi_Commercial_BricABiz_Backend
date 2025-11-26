import type { Request, Response } from "express";
import { SalesReport } from "../models/SalesReport.model.ts";

// READ ALL
export const getAllSalesReports = async (_req: Request, res: Response) => {
    try {
        const reports = await SalesReport.find();
        return res.json(reports);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

// READ ONE
export const getSalesReportById = async (req: Request, res: Response) => {
    try {
        const report = await SalesReport.findById(req.params.id);
        if (!report) return res.status(404).json({ error: "Sales report not found" });
        return res.json(report);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

// CREATE
export const createSalesReport = async (req: Request, res: Response) => {
  try {
    const report = await SalesReport.create(req.body);
    return res.status(201).json(report);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const updateSalesReport = async (req: Request, res: Response) => {
  try {
    const updated = await SalesReport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Sales report not found" });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

