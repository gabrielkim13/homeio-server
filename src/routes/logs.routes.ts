import { Router } from 'express';
import { param } from 'express-validator';

import LogsController from '../controllers/LogsController';

import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import requestValidationMiddleware from '../middlewares/requestValidationMiddleware';

const logsController = new LogsController();

const logsRouter = Router({ mergeParams: true });

logsRouter.post(
  '/',
  authenticationMiddleware,
  [
    param('place_id').isUUID().withMessage('Place ID must be a valid UUID'),
    param('device_id').isUUID().withMessage('Device ID must be a valid UUID'),
  ],
  requestValidationMiddleware,
  logsController.create,
);

logsRouter.get(
  '/',
  authenticationMiddleware,
  [param('device_id').isUUID().withMessage('Device ID must be a valid UUID')],
  requestValidationMiddleware,
  logsController.index,
);

logsRouter.get(
  '/:id',
  authenticationMiddleware,
  [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    param('device_id').isUUID().withMessage('Device ID must be a valid UUID'),
  ],
  requestValidationMiddleware,
  logsController.show,
);

export default logsRouter;
