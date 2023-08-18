import { IMatch } from '../Interfaces/matches/IMatch';

export function getHomeGames(teamId: number, matches: IMatch[]) {
  let games = 0;
  let victories = 0;
  let draws = 0;

  matches.forEach(({ homeTeamId, homeTeamGoals, awayTeamGoals }) => {
    if (teamId === homeTeamId) {
      games += 1;
      if (homeTeamGoals > awayTeamGoals) victories += 1;
      if (homeTeamGoals === awayTeamGoals) draws += 1;
    }
  });
  const losses = games - victories - draws;
  const points = (victories * 3) + draws;
  const efficiency = Number(((points / (games * 3)) * 100).toFixed(2));

  return { points, games, victories, draws, losses, efficiency };
}

export function getHomeGoals(teamId: number, matches: IMatch[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach(({ homeTeamId, homeTeamGoals, awayTeamGoals }) => {
    if (teamId === homeTeamId) {
      goalsFavor += homeTeamGoals;
      goalsOwn += awayTeamGoals;
    }
  });
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

export function getHomeTeamStats(teamName: string, teamId: number, matches: IMatch[]) {
  return {
    name: teamName,
    totalPoints: getHomeGames(teamId, matches).points,
    totalGames: getHomeGames(teamId, matches).games,
    totalVictories: getHomeGames(teamId, matches).victories,
    totalDraws: getHomeGames(teamId, matches).draws,
    totalLosses: getHomeGames(teamId, matches).losses,
    goalsFavor: getHomeGoals(teamId, matches).goalsFavor,
    goalsOwn: getHomeGoals(teamId, matches).goalsOwn,
    goalsBalance: getHomeGoals(teamId, matches).goalsBalance,
    efficiency: getHomeGames(teamId, matches).efficiency,
  };
}
