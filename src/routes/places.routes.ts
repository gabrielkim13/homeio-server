import { Router } from 'express';
import { body, param } from 'express-validator';

import PlacesController from '../controllers/PlacesController';

import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import requestValidationMiddleware from '../middlewares/requestValidationMiddleware';

const placesController = new PlacesController();

const placesRouter = Router();

placesRouter.post(
  '/',
  authenticationMiddleware,
  [
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('hub_ip').isIP().withMessage('Hub must have a valid IP address'),
  ],
  requestValidationMiddleware,
  placesController.create,
);

placesRouter.get('/', authenticationMiddleware, placesController.index);

placesRouter.get(
  '/:id',
  authenticationMiddleware,
  [param('id').isUUID().withMessage('ID must be a valid UUID')],
  requestValidationMiddleware,
  placesController.show,
);

placesRouter.put(
  '/:id',
  authenticationMiddleware,
  [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('hub_ip').isIP().withMessage('Hub must have a valid IP address'),
  ],
  requestValidationMiddleware,
  placesController.update,
);

placesRouter.delete(
  '/:id',
  authenticationMiddleware,
  [param('id').isUUID().withMessage('ID must be a valid UUID')],
  requestValidationMiddleware,
  placesController.delete,
);

export default placesRouter;
