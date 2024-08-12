import { Router } from 'express';
import matchesController from '../Controllers/matchesController';
import tokenValidation from '../middlewares/tokenValidation';

const matchesRouter = Router();
matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.patch('/:id/finish', tokenValidation, matchesController.matchFinisher);

export default matchesRouter;
