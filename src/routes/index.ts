import { Router } from 'express';

import usersRoutes from './users.routes';
import placesRoutes from './places.routes';
import devicesRoutes from './devices.routes';
import logsRoutes from './logs.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/places', placesRoutes);
routes.use('/places/:place_id/devices', devicesRoutes);
routes.use('/places/:place_id/devices/:device_id/logs', logsRoutes);

export default routes;
