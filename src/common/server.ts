import app from "./app.ts";
import { config } from "../config/config.ts";
import { connectDB } from "../config/db.ts";

async function startServer() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

startServer();
