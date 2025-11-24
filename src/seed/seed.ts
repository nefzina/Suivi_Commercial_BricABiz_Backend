import { connectDB, mongoose } from "../config/db.ts";
import { User } from "../models/User.model.js";
import { Zone } from "../models/Zone.model.ts";
import { Product } from "../models/Product.model.ts";
import { Client } from "../models/Client.model.ts";
import { SalesReport } from "../models/SalesReport.model.ts";

const clearAll = async () => {
  await Promise.all([
    Zone.deleteMany({}),
    User.deleteMany({}),
    Product.deleteMany({}),
    Client.deleteMany({}),
    SalesReport.deleteMany({}),
  ]);
};

const seed = async () => {
  await connectDB();
  // clear existing data for a clean start
  await clearAll();

  // Zones
  const zones = await Zone.insertMany([
    { name: "Auvergne-Rhône-Alpes" },
    { name: "Bourgogne-Franche-Comté" },
    { name: "Bretagne" },
    { name: "Centre-Val de Loire" },
    { name: "Corse" },
    { name: "Grand Est" },
    { name: "Hauts-de-France" },
    { name: "Ile-de-France" },
    { name: "Normandie" },
    { name: "Nouvelle-Aquitaine" },
    { name: "Occitanie" },
    { name: "Pays de la Loire" },
    { name: "Provence Alpes Côte d’Azur" },
  ]);

  // Users (5 commerciaux + 1 manager)
  const users = await User.insertMany([
    {
      name: "Alice Dupont",
      email: "alice@bricabiz.local",
      role: "commercial",
      zoneId: zones[10]._id,
    },
    {
      name: "Bob Martin",
      email: "bob@bricabiz.local",
      role: "commercial",
      zoneId: zones[1]._id,
    },
    {
      name: "Carla Nguyen",
      email: "carla@bricabiz.local",
      role: "commercial",
      zoneId: zones[2]._id,
    },
    {
      name: "Dani Lopez",
      email: "dani@bricabiz.local",
      role: "commercial",
      zoneId: zones[3]._id,
    },
    {
      name: "Eve Petit",
      email: "eve@bricabiz.local",
      role: "commercial",
      zoneId: zones[10]._id,
    },
    {
      name: "Directeur",
      email: "dir@bricabiz.local",
      role: "manager",
      zoneId: null,
    },
  ]);

  // Products
  const products = await Product.insertMany([
    {
      sku: "P-ASP-001",
      name: "Aspirateur X",
      category: "Ménager",
      unitPrice: 150,
    },
    {
      sku: "P-ASP-002",
      name: "Aspirateur Pro",
      category: "Ménager",
      unitPrice: 450,
    },
    {
      sku: "P-OUT-001",
      name: "Perceuse 18V",
      category: "Outillage",
      unitPrice: 90,
    },
    {
      sku: "P-OUT-002",
      name: "Visserie kit",
      category: "Outillage",
      unitPrice: 12,
    },
  ]);

  // Clients
  const clients = [];
  for (let i = 1; i <= 20; i++) {
    clients.push({
      name: `Client ${i}`,
      vatNumber: `FR${100000 + i}`,
      address: {
        city: i % 2 ? "Toulouse" : "Paris",
        postalCode: i % 2 ? "31000" : "75000",
        country: "FR",
      },
      assignedTo: users[i % 5]._id,
    });
  }
  const createdClients = await Client.insertMany(clients);

  // Opportunities (some won, some proposals)
  const opps = [];
  const statuses = ["lead", "qualified", "proposal", "won", "lost"];
  for (let i = 0; i < 50; i++) {
    const salesPerson = users[i % 5];
    const client = createdClients[i % createdClients.length];
    const prod = products[i % products.length];
    const qty = Math.floor(Math.random() * 20) + 1;
    const unitPrice = prod.unitPrice;
    const total = qty * unitPrice;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const probability =
      status === "won"
        ? 100
        : status === "lost"
          ? 0
          : [20, 40, 60, 70][Math.floor(Math.random() * 4)];
    opps.push({
      title: `Opportunité ${i + 1} - ${prod.name}`,
      clientId: client._id,
      salesPersonId: salesPerson._id,
      zoneId: salesPerson.zoneId,
      products: [{ productId: prod._id, qty, unitPrice }],
      totalAmount: total,
      expectedCloseDate: new Date(
        Date.now() + (Math.floor(Math.random() * 180) - 30) * 24 * 3600 * 1000,
      ),
      status,
      probability,
      notes: "",
    });
  }
  await SalesReport.insertMany(opps);

  console.log("Seed terminé.");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
  process.exit(1);
});
