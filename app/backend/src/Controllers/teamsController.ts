import { Request, Response } from 'express';
import teamsService from '../Services/teamsService';

const getAllTeams = async (_req: Request, res: Response) => {
  const teamsData = await teamsService.getAllTeams();
  return res.status(teamsData.status).json(teamsData.data);
};

export default {
  getAllTeams,
};
