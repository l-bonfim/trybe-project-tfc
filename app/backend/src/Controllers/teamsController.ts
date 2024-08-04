import { Request, Response } from 'express';
import teamsService from '../Services/teamsService';

const getAllTeams = async (_req: Request, res: Response) => {
  const teamsData = await teamsService.getAllTeams();
  return res.status(teamsData.status).json(teamsData.data);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teamData = await teamsService.getTeamById(id);
  return res.status(teamData.status).json(teamData.data);
};

export default {
  getAllTeams,
  getTeamById,
};
