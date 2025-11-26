import { Router } from 'express';
import { getAllProducts, getProductsByCategory } from '../controllers/product.controller.ts';

const productRoutes = Router();

productRoutes.get('/products', getAllProducts);
productRoutes.get('/products/category/:id', getProductsByCategory);
// productRouter.post('/products', );
// productRouter.put('/products/:id', );
// productRouter.delete('/products/:id', );

export default productRoutes;