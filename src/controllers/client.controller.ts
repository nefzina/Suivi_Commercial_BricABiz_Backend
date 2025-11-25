import type { Request, Response } from "express";
import { Client } from "../models/Client.model.ts";

// READ ALL
export const getAllClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    return res.json(client);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// CREATE
export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);
    return res.status(201).json(client);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// READ ALL NEW
export const getAllNewClients = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);
    const clients = await Client.aggregate([
      {
        $match: {
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
    ]);

    return res.json(clients);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
