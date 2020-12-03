import { Router } from 'express';
import { body } from 'express-validator';

import LogsController from '../controllers/LogsController';

import requestValidationMiddleware from '../middlewares/requestValidationMiddleware';

import { DeviceTypes } from '../models/entities/Device';

const logsController = new LogsController();

const logsRouter = Router({ mergeParams: true });

logsRouter.post(
  '/',
  [
    body('ip').isIP().withMessage('Device IP must be a valid IP address'),
    body('type')
      .custom(input => Object.values(DeviceTypes).includes(input))
      .withMessage('Device type is invalid'),
    body('value').exists().withMessage('Value must be provided'),
  ],
  requestValidationMiddleware,
  logsController.createFromNodered,
);

export default logsRouter;
