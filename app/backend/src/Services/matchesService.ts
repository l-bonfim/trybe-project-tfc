import IMatches from '../Interfaces/Matches';
import IServiceResponse from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

const getFilteredMatches = async (matchStatus: unknown): Promise<IServiceResponse<IMatches[]>> => {
  const matchesData = await MatchModel.findAll({
    where: { inProgress: matchStatus === 'true' },
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

const getAllMatches = async (matchStatus: unknown): Promise<IServiceResponse<IMatches[]>> => {
  if (matchStatus === undefined) {
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
  }
  return getFilteredMatches(matchStatus);
};

const matchFinisher = async (id: string): Promise<IServiceResponse<IMatches[]>> => {
  await MatchModel.update({ inProgress: false }, { where: { id } });
  return {
    status: 200,
    data: { message: 'Finished' },
  };
};

export default {
  getAllMatches,
  matchFinisher,
};
