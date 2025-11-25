import { Router } from 'express';
import { getUserById } from '../controllers/user.controller.ts';

const userRoutes = Router();

userRoutes.get('/users/:id', getUserById);

export default userRoutes;