import { Router } from 'express';
import { getAllZones } from '../controllers/zone.controller.ts';

const zoneRoutes = Router();

zoneRoutes.get('/zones', getAllZones);

export default zoneRoutes;