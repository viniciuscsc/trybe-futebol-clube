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

  return { points, games, victories, draws, losses };
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

  return { goalsFavor, goalsOwn };
}
