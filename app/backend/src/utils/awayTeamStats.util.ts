import { IMatch } from '../Interfaces/matches/IMatch';

export function getAwayGames(teamId: number, matches: IMatch[]) {
  let games = 0;
  let victories = 0;
  let draws = 0;

  matches.forEach(({ awayTeamId, awayTeamGoals, homeTeamGoals }) => {
    if (teamId === awayTeamId) {
      games += 1;
      if (awayTeamGoals > homeTeamGoals) victories += 1;
      if (awayTeamGoals === homeTeamGoals) draws += 1;
    }
  });
  const losses = games - victories - draws;
  const points = (victories * 3) + draws;
  const efficiency = Number(((points / (games * 3)) * 100).toFixed(2));

  return { points, games, victories, draws, losses, efficiency };
}

export function getAwayGoals(teamId: number, matches: IMatch[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach(({ awayTeamId, awayTeamGoals, homeTeamGoals }) => {
    if (teamId === awayTeamId) {
      goalsFavor += awayTeamGoals;
      goalsOwn += homeTeamGoals;
    }
  });
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

export function getAwayTeamStats(teamName: string, teamId: number, matches: IMatch[]) {
  return {
    name: teamName,
    totalPoints: getAwayGames(teamId, matches).points,
    totalGames: getAwayGames(teamId, matches).games,
    totalVictories: getAwayGames(teamId, matches).victories,
    totalDraws: getAwayGames(teamId, matches).draws,
    totalLosses: getAwayGames(teamId, matches).losses,
    goalsFavor: getAwayGoals(teamId, matches).goalsFavor,
    goalsOwn: getAwayGoals(teamId, matches).goalsOwn,
    goalsBalance: getAwayGoals(teamId, matches).goalsBalance,
    efficiency: getAwayGames(teamId, matches).efficiency,
  };
}
