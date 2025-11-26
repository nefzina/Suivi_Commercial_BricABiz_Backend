import type { Request, Response } from "express";
import { User } from "../models/User.model.ts";
import { SalesReport } from "../models/SalesReport.model.ts";
import type { IUserPerformance } from "../interfaces/IUser.ts";

// READ ALL
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

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

// READ USERS BY ZONE
export const getUsersByZone = async (req: Request, res: Response) => {
  try {
    const id: String | undefined = req.params.id;
    if (!id) return res.status(400).json({ message: "Zone_Id is missing." });

    const users = await User.find({ zoneId: String })
      .populate("zoneId")
      .sort({ fullname: 1 });

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
};

// GET USER PERFORMANCES
export const getUserPerformance = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User_Id is missing." });
    }

    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mandatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    // Vérification de la validité des dates
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format for 'from' or 'to'." });
    }

    // Ajout d'une journée à 'toDate' pour inclure toute la journée de fin
    toDate.setDate(toDate.getDate() + 1);

    const aggregationPipeline = await SalesReport.aggregate([
      {
        $match: {
          salesPersonId: id,
          createdAt: { $gte: fromDate, $lt: toDate },
        },
      },
      {
        $group: {
          _id: null,
          totalCA: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "won"] },
                then: "$totalAmount",
                else: 0,
              },
            },
          },
          wonSales: {
            $sum: {
              $cond: { if: { $eq: ["$status", "won"] }, then: 1, else: 0 },
            },
          },
          totalSales: { $sum: 1 },
        },
      },
    ]);

    const results = aggregationPipeline[0];
    if (!results) {
      const emptyPerformance: IUserPerformance = {
        totalCA: 0,
        wonSales: 0,
        totalSales: 0,
        conversionRate: "0.00",
      };
      return res.json(emptyPerformance);
    }

    // --- Calculer le taux de conversion ---
    const totalSales = results.totalSales || 0;
    const wonSales = results.wonSales || 0;

    const conversionRate =
      totalSales > 0 ? ((wonSales / totalSales) * 100).toFixed(2) : "0.00";

    const userPerformance: IUserPerformance = {
      totalCA: results.totalCA,
      wonSales: wonSales,
      totalSales: totalSales,
      conversionRate: conversionRate,
    };
    return res.json(userPerformance);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
