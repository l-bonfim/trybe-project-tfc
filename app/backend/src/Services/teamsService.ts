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

export default {
  getAllTeams,
};
