import type { Request, Response } from "express";
import { SalesReport } from "../models/SalesReport.model.ts";

//  GET CA By Zone
export const getCAByZone = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const CAByZone = await SalesReport.aggregate([
      {
        $match: {
          status: "won",
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $lookup: {
          from: "zones",
          localField: "zoneId",
          foreignField: "_id",
          as: "zone",
        },
      },
      {
        $unwind: {
          path: "$zone",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$zone.name",
          totalCA: { $sum: "$totalAmount" },
          countReports: { $sum: 1 },
        },
      },
      {
        $sort: { totalCA: -1 },
      },
    ]);

    res.json(CAByZone);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne" });
  }
};

//  GET CA By SalesPerson
export const getCABySalesPerson = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const caPerSalesPerson = await SalesReport.aggregate([
      {
        $match: {
          status: "won",
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "salesPersonId",
          foreignField: "_id",
          as: "salesPerson",
        },
      },
      {
        $unwind: {
          path: "$salesPerson",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$salesPerson.fullname",
          totalCA: { $sum: "$totalAmount" },
          totalSells: { $sum: "$products.qty" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { totalCA: -1 },
      },
    ]);

    res.json(caPerSalesPerson);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne" });
  }
};

//  GET CA BY PRODUCT CATEGORY
export const getCAByProductCategory = async (req: Request, res: Response) => {
  
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const caByProductCategory = await SalesReport.aggregate([
      {
        $match: {
          status: "won",
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      { $unwind: "$products" }, // déplier chaque produit vendu
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.categoryId",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $group: {
          _id: "$productInfo.categoryId",
          categoryName: { $first: "$categoryInfo.name" },
          totalQty: { $sum: "$products.qty" },
          totalCA: {
            $sum: { $multiply: ["$products.qty", "$productInfo.unitPrice"] },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { totalCA: -1 },
      },
    ]);

    res.json(caByProductCategory);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne" });
  }
};

//  GET Total CA
export const getCA = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const CA = await SalesReport.aggregate([
      {
        $match: {
          status: "won",
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: null,
          totalCA: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalCA: number = CA.length ? CA[0].totalCA : 0;
    res.json(totalCA);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne" });
  }
};

//  GET SELLS PER PRODUCT
export const getSellsPerProduct = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const sellsPerProduct = await SalesReport.aggregate([
      {
        $match: {
          status: "won",
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      { $unwind: "$products" }, // déplier chaque produit vendu
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$productInfo.name",
          totalQty: { $sum: "$products.qty" },
          totalCA: {
            $sum: { $multiply: ["$products.qty", "$productInfo.unitPrice"] },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalCA: -1 } },
    ]);

    res.json(sellsPerProduct);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne" });
  }
};

// GET WON SALES
export const getWonSales = async (req: Request, res: Response) => {

  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "from and to are mendatory." });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const wonSales = await SalesReport.aggregate([
      {
        $match: {
          status: "won",
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: null,
          wonSales: { $sum: 1 },
        },
      },
    ]);

    res.json(wonSales);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur interne" });
  }
};
