import { Router } from 'express';
import matchesController from '../Controllers/matchesController';

const matchesRouter = Router();
matchesRouter.get('/', matchesController.getAllMatches);

export default matchesRouter;
