import { Request, Response } from 'express';
import leaderboardService from '../Services/leaderboardService';

const homeLeaderboard = async (_req: Request, res: Response) => {
  const homeLeaderData = await leaderboardService.homeLeaderboard();
  return res.status(homeLeaderData.status).json(homeLeaderData.data);
};

export default {
  homeLeaderboard,
};
