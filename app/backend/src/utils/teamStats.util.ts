import { IMatch } from '../Interfaces/matches/IMatch';

export function getGames(teamId: number, matches: IMatch[]) {
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

export function getGoals(teamId: number, matches: IMatch[]) {
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
