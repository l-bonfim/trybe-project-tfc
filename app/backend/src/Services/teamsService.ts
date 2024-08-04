import ITeams from '../Interfaces/Teams';
import IServiceResponse from '../Interfaces/ServiceResponse';
import TeamModel from '../database/models/TeamModel';

const getAllTeams = async (): Promise<IServiceResponse<ITeams[]>> => {
  const teamsData = await TeamModel.findAll();
  return {
    status: 200,
    data: teamsData.map((team) => team.dataValues),
  };
};

const getTeamById = async (id: string): Promise<IServiceResponse<ITeams>> => {
  const teamData = await TeamModel.findByPk(id);
  if (!teamData) {
    return {
      status: 404,
      data: { message: 'Team not found' },
    };
  }
  return {
    status: 200,
    data: teamData?.dataValues,
  };
};

export default {
  getAllTeams,
  getTeamById,
};
