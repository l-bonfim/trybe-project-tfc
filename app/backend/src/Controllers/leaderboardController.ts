import { Request, Response } from 'express';
import leaderboardService from '../Services/leaderboardService';

const homeLeaderboard = async (_req: Request, res: Response) => {
  const homeLeaderData = await leaderboardService.homeLeaderboard();
  return res.status(homeLeaderData.status).json(homeLeaderData.data);
};

const awayLeaderboard = async (_req: Request, res: Response) => {
  const awayLeaderData = await leaderboardService.awayLeaderboard();
  return res.status(awayLeaderData.status).json(awayLeaderData.data);
};

export default {
  homeLeaderboard,
  awayLeaderboard,
};
