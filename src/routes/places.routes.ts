import { Router } from 'express';

import PlacesController from '../controllers/PlacesController';

const placesController = new PlacesController();

const placesRouter = Router();

placesRouter.post('/', placesController.create);
placesRouter.get('/', placesController.index);
placesRouter.get('/:id', placesController.show);
placesRouter.put('/:id', placesController.update);
placesRouter.delete('/:id', placesController.delete);

export default placesRouter;
