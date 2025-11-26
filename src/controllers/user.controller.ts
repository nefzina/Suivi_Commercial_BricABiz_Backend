import type { Request, Response } from "express";
import { User } from "../models/User.model.ts";

// READ ONE
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};