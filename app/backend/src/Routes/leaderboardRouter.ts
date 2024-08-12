import { Router } from 'express';
import leaderboardController from '../Controllers/leaderboardController';

const leaderboardRouter = Router();
leaderboardRouter.get('/home', leaderboardController.homeLeaderboard);
leaderboardRouter.get('/away', leaderboardController.awayLeaderboard);

export default leaderboardRouter;
