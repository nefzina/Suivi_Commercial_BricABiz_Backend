import mongoose from "mongoose";
import { config } from './config.ts';

const uri = config.mongoDB;

const connectDB = async () => {
  await mongoose.connect(uri);
  console.log('MongoDB connecté ->', uri);
}

module.exports = { connectDB, mongoose };
