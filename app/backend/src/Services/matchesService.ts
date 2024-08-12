import IMatches from '../Interfaces/Matches';
import IServiceResponse from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

const getAllMatches = async (): Promise<IServiceResponse<IMatches[]>> => {
  const matchesData = await MatchModel.findAll({
    include: [
      { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  const matchesDataRes = matchesData.map((match) => match.dataValues);
  return {
    status: 200,
    data: matchesDataRes,
  };
};

export default {
  getAllMatches,
};
