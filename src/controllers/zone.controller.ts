import type { Request, Response } from "express";
import { Zone } from "../models/Zone.model.ts";

// READ ALL
export const getAllZones = async (_req: Request, res: Response) => {
  try {
    const zones = await Zone.find();
    return res.json(zones);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};