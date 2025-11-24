import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoDB: process.env.MONGO_URI || 'mongodb://localhost:27017/bricabiz_dev',
};
