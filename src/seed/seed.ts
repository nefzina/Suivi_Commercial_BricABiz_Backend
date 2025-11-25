import { User } from "../models/User.model.ts";
import { Zone } from "../models/Zone.model.ts";
import { Product } from "../models/Product.model.ts";
import { Client } from "../models/Client.model.ts";
import { SalesReport } from "../models/SalesReport.model.ts";
import mongoose from "mongoose";
import { connectDB } from "../config/db.ts";
import { Category } from "../models/Category.model.ts";

const clearAll = async () => {
  await Promise.all([
    Zone.deleteMany({}),
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Client.deleteMany({}),
    SalesReport.deleteMany({}),
  ]);
};

const seed = async () => {
  await connectDB();
  await clearAll(); // clear existing data for a clean start

  // Zones
  const zones = await Zone.insertMany([
    { name: "Nord" },
    { name: "Sud-ouest" },
    { name: "Est" },
    { name: "Sud" },
  ]);

  // Users (5 commerciaux + 1 manager)
  const users = await User.insertMany([
    {
      fullname: "Alice Dupont",
      email: "alice@bricabiz.local",
      role: "commercial",
      zoneId: zones[0]!._id,
    },
    {
      fullname: "Bob Martin",
      email: "bob@bricabiz.local",
      role: "commercial",
      zoneId: zones[1]!._id,
    },
    {
      fullname: "Carla Nguyen",
      email: "carla@bricabiz.local",
      role: "commercial",
      zoneId: zones[2]!._id,
    },
    {
      fullname: "Dani Lopez",
      email: "dani@bricabiz.local",
      role: "commercial",
      zoneId: zones[3]!._id,
    },
    {
      fullname: "Mr Directeur",
      email: "dir@bricabiz.local",
      role: "manager",
      zoneId: null,
    },
  ]);

  // Categories
  const categories = await Category.insertMany([
    { name: "Generateur" },
    { name: "Mesure" },
  ]);

  // Products
  const products = await Product.insertMany([
    {
      sku: "P-GEN-001",
      name: "Generateur de signaux",
      category: categories[0],
      unitPrice: 510,
      costPrice: 250,
    },
    {
      sku: "P-GEN-002",
      name: "Generateur haute frequence",
      category: categories[0],
      unitPrice: 270,
      costPrice: 150,
    },
    {
      sku: "P-GEN-003",
      name: "Generateur multimetrix",
      category: categories[0],
      unitPrice: 430,
      costPrice: 300,
    },
    {
      sku: "P-OSC-001",
      name: "Oscilloscope RIGOL",
      category: categories[1],
      unitPrice: 625,
      costPrice: 300,
    },
    {
      sku: "P-OSC-002",
      name: "Oscilloscope portable",
      category: categories[1],
      unitPrice: 65,
      costPrice: 20,
    },
  ]);

  const villes = ["Paris", "Toulouse", "Grenoble", "Nice"];
  const postalCode = ["75000", "31300", "38000", "06000"];
  // Clients
  const clients = [];
  for (let i = 1; i <= 20; i++) {
    clients.push({
      name: `Client ${i}`,
      vatNumber: `FR${100000 + i}`,
      address: {
        city: villes[i % 4],
        postalCode: postalCode[i % 4],
        country: "FR",
      },
      assignedTo: users[i % 4]!._id,
    });
  }
  const createdClients = await Client.insertMany(clients);

  // SalesReports (some won, some proposals)
  const reports = [];
  const statuses = ["lead", "qualified", "proposal", "won", "lost"];
  for (let i = 0; i < 50; i++) {
    const salesPerson = users[i % 4];
    const client = createdClients[i % createdClients.length];
    const prod = products[i % products.length];
    const qty = Math.floor(Math.random() * 20) + 1;
    const unitPrice = prod!.unitPrice;
    const total = qty * unitPrice;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const probability =
      status === "won"
        ? 100
        : status === "lost"
          ? 0
          : [20, 40, 60, 70][Math.floor(Math.random() * 4)];
    reports.push({
      title: `Opportunité ${i + 1} - ${prod!.name}`,
      clientId: client!._id,
      salesPersonId: salesPerson!._id,
      zoneId: salesPerson!.zoneId,
      products: [{ productId: prod!._id, qty, unitPrice }],
      totalAmount: total,
      expectedCloseDate: new Date(
        Date.now() + (Math.floor(Math.random() * 180) - 30) * 24 * 3600 * 1000,
      ),
      status,
      probability,
      notes: "",
    });
  }
  await SalesReport.insertMany(reports);

  console.log("Seed terminé.");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
  process.exit(1);
});
