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

const matchFinisher = async (id: string): Promise<IServiceResponse<string>> => {
  await MatchModel.update({ inProgress: false }, { where: { id } });
  return {
    status: 200,
    data: { message: 'Finished' },
  };
};

const updateMatch = async (homeTeamGoals: number, awayTeamGoals: number, id: string):
Promise<IServiceResponse<string>> => {
  await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return {
    status: 200,
    data: { message: 'Updated' },
  };
};

const matchValidation = async (homeTeamId: number, awayTeamId: number)
: Promise<IServiceResponse<IMatches | boolean>> => {
  if (homeTeamId === awayTeamId) {
    return {
      status: 422,
      data: { message: 'It is not possible to create a match with two equal teams' },
    };
  }
  const homeTeam = await TeamModel.findByPk(homeTeamId);
  const awayTeam = await TeamModel.findByPk(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return {
      status: 404,
      data: { message: 'There is no team with such id!' },
    };
  }
  return { status: 201, data: true };
};

const createMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
): Promise<IServiceResponse<IMatches | boolean>> => {
  const validation = await matchValidation(homeTeamId, awayTeamId);
  if (validation.data !== true) {
    return validation;
  }
  const matchData = await MatchModel.create({ homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  return { status: 201, data: matchData.dataValues };
};

export default {
  getAllMatches,
  matchFinisher,
  updateMatch,
  createMatch,
};
