import { Router } from 'express';

import DevicesController from '../controllers/DevicesController';

const devicesController = new DevicesController();

const devicesRouter = Router();

devicesRouter.post('/', devicesController.create);
devicesRouter.get('/', devicesController.index);
devicesRouter.get('/:id', devicesController.show);
devicesRouter.put('/:id', devicesController.update);
devicesRouter.delete('/:id', devicesController.delete);

export default devicesRouter;
