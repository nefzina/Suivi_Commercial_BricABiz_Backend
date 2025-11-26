import { Router } from 'express';
import { getAllUsers, getUserById, getUserPerformance, getUsersByZone } from '../controllers/user.controller.ts';

const userRoutes = Router();

userRoutes.get('/users', getAllUsers);
userRoutes.get('/users/:id', getUserById);
userRoutes.get('/users/zones/:id', getUsersByZone);
userRoutes.get('/users/:id/performance', getUserPerformance);

export default userRoutes;