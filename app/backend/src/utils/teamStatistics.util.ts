import { IMatch } from '../Interfaces/matches/IMatch';

export function getGoalsFavor(id: number, matches: IMatch[]) {
  let goalsFavor = 0;

  matches.forEach((match) => {
    if (id === match.homeTeamId) {
      goalsFavor += match.homeTeamGoals;
    }
  });

  return goalsFavor;
}

export function getGoalsOwn(id: number, matches: IMatch[]) {
  let goalsOwn = 0;

  matches.forEach((match) => {
    if (id === match.homeTeamId) {
      goalsOwn += match.awayTeamGoals;
    }
  });

  return goalsOwn;
}
