import { Request, Response } from 'express';
import matchesService from '../Services/matchesService';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matchesData = await matchesService.getAllMatches(inProgress);
  return res.status(matchesData.status).json(matchesData.data);
};

const matchFinisher = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataRes = await matchesService.matchFinisher(id);
  return res.status(dataRes.status).json(dataRes.data);
};

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const dataRes = await matchesService.updateMatch(homeTeamGoals, awayTeamGoals, id);
  return res.status(dataRes.status).json(dataRes.data);
};

const createMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const dataRes = await matchesService
    .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
  return res.status(dataRes.status).json(dataRes.data);
};

export default {
  getAllMatches,
  matchFinisher,
  updateMatch,
  createMatch,
};
