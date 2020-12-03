import { Router } from 'express';

import usersRoutes from './users.routes';
import placesRoutes from './places.routes';
import devicesRoutes from './devices.routes';
import logsRoutes from './logs.routes';
import noderedRoutes from './nodered.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/places', placesRoutes);
routes.use('/places/:place_id/devices', devicesRoutes);
routes.use('/places/:place_id/devices/:device_id/logs', logsRoutes);
routes.use('/nodered', noderedRoutes);

export default routes;
