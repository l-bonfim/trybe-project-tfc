import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ILeaderboard from '../Interfaces/Leaderboard';
import IMatches from '../Interfaces/Matches';

const getAllTeams = async () => {
  const teamsData = await TeamModel.findAll();
  return teamsData.map((team) => team.dataValues);
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

const getHomeStats = (winStat: { victory: number; loss: number; draw: number;
  goalsFavor: number; goalOwn: number; points: number;
  goalBalance:number; efficiency: number }, matchInfo: IMatches[]) => {
  const auxStat = winStat;
  matchInfo.forEach((match) => {
    auxStat.goalsFavor += match.homeTeamGoals;
    auxStat.goalOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      auxStat.victory += 1;
      auxStat.points += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      auxStat.loss += 1;
    } else {
      auxStat.draw += 1;
      auxStat.points += 1;
    }
  });
  return auxStat;
};

const getAwayStats = (winStat: { victory: number; loss: number; draw: number;
  goalsFavor: number; goalOwn: number; points: number;
  goalBalance:number; efficiency: number }, matchInfo: IMatches[]) => {
  const auxStat = winStat;
  matchInfo.forEach((match) => {
    auxStat.goalsFavor += match.awayTeamGoals;
    auxStat.goalOwn += match.homeTeamGoals;
    if (match.homeTeamGoals < match.awayTeamGoals) {
      auxStat.victory += 1;
      auxStat.points += 3;
    } else if (match.homeTeamGoals > match.awayTeamGoals) {
      auxStat.loss += 1;
    } else {
      auxStat.draw += 1;
      auxStat.points += 1;
    }
  });
  return auxStat;
};

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
  const winStatF = getHomeStats(winStat, matchInfo);
  winStatF.goalBalance = winStat.goalsFavor - winStat.goalOwn;
  winStatF.efficiency = (winStat.points / (count * 3)) * 100;
  return dataRes(teamName, winStatF, count);
};

const getAwayMatches = async (id: number, teamName: string) => {
  const awayMatchesData = await MatchModel.findAndCountAll(
    { where: { awayTeamId: id, inProgress: false } },
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
  const { count, rows } = awayMatchesData;
  const matchInfo = rows.map((match) => match.dataValues);
  const winStatF = getAwayStats(winStat, matchInfo);
  winStatF.goalBalance = winStat.goalsFavor - winStat.goalOwn;
  winStatF.efficiency = (winStat.points / (count * 3)) * 100;
  return dataRes(teamName, winStatF, count);
};

const getHomeInfos = async () => {
  const teamsData = await getAllTeams();
  const matchesInfo = await Promise
    .all(teamsData.map((team) => getHomeMatches(team.id, team.teamName)));
  return matchesInfo;
};

const getAwayInfos = async () => {
  const teamsData = await getAllTeams();
  const matchesInfo = await Promise
    .all(teamsData.map((team) => getAwayMatches(team.id, team.teamName)));
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

const awayLeaderboard = async () => {
  const awayInfo = await getAwayInfos();
  const sortedAwayInfo = leaderboardSorter(awayInfo);
  return {
    status: 200,
    data: sortedAwayInfo,
  };
};

export default {
  homeLeaderboard,
  awayLeaderboard,
};
