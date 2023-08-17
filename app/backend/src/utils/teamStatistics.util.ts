import { IMatch } from '../Interfaces/matches/IMatch';

// totalPoints: number,
// totalGames: number,
// totalVictories: number,
// totalDraws: number,
// totalLosses: number,

export function getGames(id: number, matches: IMatch[]) {
  let games = 0;
  let victories = 0;
  let draws = 0;

  matches.forEach((match) => {
    if (id === match.homeTeamId) {
      games += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    }
  });
  const losses = games - victories - draws;
  const points = (victories * 3) + draws;

  return { points, games, victories, draws, losses };
}

export function getGoals(id: number, matches: IMatch[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    if (id === match.homeTeamId) {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    }
  });

  return { goalsFavor, goalsOwn };
}
