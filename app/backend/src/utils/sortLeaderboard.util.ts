import { ITeamStats } from '../Interfaces/teams/ITeamStats';

export default function sortLeaderboard(leaderboard: ITeamStats[]) {
  const sortedLeaderboard = leaderboard.sort((a: ITeamStats, b: ITeamStats): number => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    return b.goalsFavor - a.goalsFavor;
  });

  return sortedLeaderboard;
}
