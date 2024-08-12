import { Request, Response } from 'express';
import matchesService from '../Services/matchesService';

const getAllMatches = async (_req: Request, res: Response) => {
  const matchesData = await matchesService.getAllMatches();
  return res.status(matchesData.status).json(matchesData.data);
};

export default {
  getAllMatches,
};
