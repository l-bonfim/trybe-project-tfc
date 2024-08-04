import { Router } from 'express';
import teamsController from '../Controllers/teamsController';

const teamsRouter = Router();
teamsRouter.get('/', teamsController.getAllTeams);
teamsRouter.get('/:id', teamsController.getTeamById);

export default teamsRouter;
