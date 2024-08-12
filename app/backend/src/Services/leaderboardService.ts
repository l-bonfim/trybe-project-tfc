/* eslint-disable no-param-reassign */
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ILeaderboard from '../Interfaces/Leaderboard';

const getAllTeams = async () => {
  const teamsData = await TeamModel.findAll();
  return teamsData.map((team) => team.dataValues);
};

const matchStat = async (
  homeTeamGoals: number,
  awayTeamGoals: number,
  winStat: { victory: number; loss: number; draw: number;
    goalsFavor: number; goalOwn: number; points: number; },
): Promise<void> => {
  winStat.goalsFavor += homeTeamGoals;
  winStat.goalOwn += awayTeamGoals;
  if (homeTeamGoals > awayTeamGoals) {
    winStat.victory += 1;
    winStat.points += 3;
  }
  if (homeTeamGoals < awayTeamGoals) winStat.loss += 1;
  if (homeTeamGoals === awayTeamGoals) {
    winStat.draw += 1;
    winStat.points += 1;
  }
};

const dataRes = (
  teamName: string,
  winStat: { victory: number; loss: number; draw: number;
    goalsFavor: number; goalOwn: number; points: number;
    goalBalance:number; efficiency: number },
  count: number,
) => ({
  name: teamName,
  totalPoints: winStat.points,
  totalGames: count,
  totalVictories: winStat.victory,
  totalDraws: winStat.draw,
  totalLosses: winStat.loss,
  goalsFavor: winStat.goalsFavor,
  goalsOwn: winStat.goalOwn,
  goalsBalance: winStat.goalBalance,
  efficiency: parseFloat(winStat.efficiency.toFixed(2)),
});

const getHomeMatches = async (id: number, teamName: string) => {
  const homeMatchesData = await MatchModel.findAndCountAll(
    { where: { homeTeamId: id, inProgress: false } },
  );
  const winStat = { victory: 0,
    loss: 0,
    draw: 0,
    goalsFavor: 0,
    goalOwn: 0,
    points: 0,
    goalBalance: 0,
    efficiency: 0,
  };
  const { count, rows } = homeMatchesData;
  const matchInfo = rows.map((match) => match.dataValues);
  matchInfo.map((match) => matchStat(match.homeTeamGoals, match.awayTeamGoals, winStat));
  winStat.goalBalance = winStat.goalsFavor - winStat.goalOwn;
  winStat.efficiency = (winStat.points / (count * 3)) * 100;
  return dataRes(teamName, winStat, count);
};

const getHomeInfos = async () => {
  const teamsData = await getAllTeams();
  const matchesInfo = await Promise
    .all(teamsData.map((team) => getHomeMatches(team.id, team.teamName)));
  return matchesInfo;
};

const leaderboardSorter = (boardInfo: ILeaderboard[]) => {
  const boardSorted = boardInfo.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
  return boardSorted;
};

const homeLeaderboard = async () => {
  const homeInfo = await getHomeInfos();
  const sortedHomeInfo = leaderboardSorter(homeInfo);
  return {
    status: 200,
    data: sortedHomeInfo,
  };
};

export default {
  homeLeaderboard,
};
