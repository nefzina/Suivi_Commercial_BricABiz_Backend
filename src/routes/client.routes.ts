import { Router } from 'express';
import { createClient, getAllClients, getClientById, getAllNewClients } from '../controllers/client.controller.ts';

const clientRoutes = Router();

clientRoutes.get('/clients', getAllClients);
clientRoutes.get('/clients/new', getAllNewClients);
clientRoutes.get('/clients/:id', getClientById);
clientRoutes.post('/clients', createClient);

export default clientRoutes;