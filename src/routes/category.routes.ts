import { Router } from 'express';
import { getAllCategories } from '../controllers/category.controller.ts';

const categoryRoutes = Router();

categoryRoutes.get('/categories', getAllCategories);

export default categoryRoutes;