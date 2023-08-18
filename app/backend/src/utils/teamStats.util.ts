import { IMatch } from '../Interfaces/matches/IMatch';
import { getAwayGames, getAwayGoals } from './awayTeamStats.util';
import { getHomeGames, getHomeGoals } from './homeTeamStats.util';

export function getGames(teamId: number, matches: IMatch[]) {
  const points = getHomeGames(teamId, matches).points + getAwayGames(teamId, matches).points;
  const games = getHomeGames(teamId, matches).games + getAwayGames(teamId, matches).games;
  const victories = getHomeGames(teamId, matches).victories
  + getAwayGames(teamId, matches).victories;
  const draws = getHomeGames(teamId, matches).draws + getAwayGames(teamId, matches).draws;
  const losses = getHomeGames(teamId, matches).losses + getAwayGames(teamId, matches).losses;
  const efficiency = Number(((points / (games * 3)) * 100).toFixed(2));

  return { points, games, victories, draws, losses, efficiency };
}

export function getGoals(teamId: number, matches: IMatch[]) {
  const goalsFavor = getHomeGoals(teamId, matches).goalsFavor
  + getAwayGoals(teamId, matches).goalsFavor;
  const goalsOwn = getHomeGoals(teamId, matches).goalsOwn + getAwayGoals(teamId, matches).goalsOwn;
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

export function getTeamStats(teamName: string, teamId: number, matches: IMatch[]) {
  return {
    name: teamName,
    totalPoints: getGames(teamId, matches).points,
    totalGames: getGames(teamId, matches).games,
    totalVictories: getGames(teamId, matches).victories,
    totalDraws: getGames(teamId, matches).draws,
    totalLosses: getGames(teamId, matches).losses,
    goalsFavor: getGoals(teamId, matches).goalsFavor,
    goalsOwn: getGoals(teamId, matches).goalsOwn,
    goalsBalance: getGoals(teamId, matches).goalsBalance,
    efficiency: getGames(teamId, matches).efficiency,
  };
}
