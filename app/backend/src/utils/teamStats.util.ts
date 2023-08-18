import { IMatch } from '../Interfaces/matches/IMatch';
import { getAwayGames, getAwayGoals } from './awayTeamStats.util';
import { getHomeGames, getHomeGoals } from './homeTeamStats.util';

export function getGames(teamId: number, matches: IMatch[]) {
  return {
    points: getHomeGames(teamId, matches).points + getAwayGames(teamId, matches).points,
    games: getHomeGames(teamId, matches).games + getAwayGames(teamId, matches).games,
    victories: getHomeGames(teamId, matches).victories + getAwayGames(teamId, matches).victories,
    draws: getHomeGames(teamId, matches).draws + getAwayGames(teamId, matches).draws,
    losses: getHomeGames(teamId, matches).losses + getAwayGames(teamId, matches).losses,
    efficiency: getHomeGames(teamId, matches).efficiency + getAwayGames(teamId, matches).efficiency,
  };
}

export function getGoals(teamId: number, matches: IMatch[]) {
  return {
    goalsFavor: getHomeGoals(teamId, matches).goalsFavor + getAwayGoals(teamId, matches).goalsFavor,
    goalsOwn: getHomeGoals(teamId, matches).goalsOwn + getAwayGoals(teamId, matches).goalsOwn,
    goalsBalance: getAwayGoals(teamId, matches).goalsBalance
    + getAwayGoals(teamId, matches).goalsBalance,
  };
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
