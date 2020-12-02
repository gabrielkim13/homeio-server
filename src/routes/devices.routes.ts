import { Request, Response, NextFunction, Router } from 'express';
import { body, param } from 'express-validator';

import DevicesController from '../controllers/DevicesController';

import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import requestValidationMiddleware from '../middlewares/requestValidationMiddleware';

import { DeviceTypes } from '../models/entities/Device';

const devicesController = new DevicesController();

const devicesRouter = Router({ mergeParams: true });

devicesRouter.post(
  '/',
  authenticationMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);

    return next();
  },
  [
    param('place_id').isUUID().withMessage('Place ID must be a valid UUID'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('ip').isIP().withMessage('Hub must have a valid IP address'),
    body('type')
      .custom(input => Object.values(DeviceTypes).includes(input))
      .withMessage('Device type is invalid'),
  ],
  requestValidationMiddleware,
  devicesController.create,
);

devicesRouter.get(
  '/',
  authenticationMiddleware,
  [param('place_id').isUUID().withMessage('Place ID must be a valid UUID')],
  requestValidationMiddleware,
  devicesController.index,
);

devicesRouter.get(
  '/:id',
  authenticationMiddleware,
  [param('id').isUUID().withMessage('ID must be a valid UUID')],
  requestValidationMiddleware,
  devicesController.show,
);

devicesRouter.put(
  '/:id',
  authenticationMiddleware,
  [
    param('place_id').isUUID().withMessage('Place ID must be a valid UUID'),
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('ip').isIP().withMessage('Device must have a valid IP address'),
    body('type')
      .custom(input => Object.values(DeviceTypes).includes(input))
      .withMessage('Device type is invalid'),
  ],
  requestValidationMiddleware,
  devicesController.update,
);

devicesRouter.delete(
  '/:id',
  authenticationMiddleware,
  [
    param('place_id').isUUID().withMessage('Place ID must be a valid UUID'),
    param('id').isUUID().withMessage('ID must be a valid UUID'),
  ],
  requestValidationMiddleware,
  devicesController.delete,
);

export default devicesRouter;
