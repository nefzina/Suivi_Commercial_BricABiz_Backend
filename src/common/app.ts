import express from 'express';
import type { Application, Request, Response } from 'express';
import routes from '../routes/product.routes.ts';
import cors from 'cors';
import salesReportRoutes from '../routes/salesReport.routes.ts';
import userRoutes from '../routes/user.routes.ts';
import categoryRoutes from '../routes/category.routes.ts';
import clientRoutes from '../routes/client.routes.ts';
import importRoutes from '../routes/imports.routes.ts';
import productRoutes from '../routes/product.routes.ts';

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
  );
  
// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the MERN commercial tool API ...' });
});

// API routes
app.use('/api', salesReportRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', clientRoutes);
app.use('/api', importRoutes);
app.use('/api', productRoutes);


export default app;
