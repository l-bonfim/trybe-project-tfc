import { Router } from 'express';
import teamsController from '../Controllers/teamsController';

const teamsRouter = Router();
teamsRouter.get('/', teamsController.getAllTeams);

export default teamsRouter;
