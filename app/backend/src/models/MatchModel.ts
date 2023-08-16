import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';

import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IUpdatedMatch } from '../Interfaces/matches/IUpdatedMatch';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(inProgress?: boolean): Promise<IMatch[]> {
    const whereInProgress = inProgress === undefined ? {} : { inProgress };

    const matches = await this.model.findAll({
      where: whereInProgress,
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: { exclude: ['id'], include: ['teamName'] },
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: { exclude: ['id'], include: ['teamName'] },
        },
      ],
    });
    return matches;
  }

  async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  async endMatch(id: number): Promise<void> {
    const match = await this.model.findOne({ where: { id } });

    const updatedMatch = { ...match, inProgress: false };

    await this.model.update(updatedMatch, { where: { id } });
  }

  async updateMatch(updatedMatchData: IUpdatedMatch): Promise<void> {
    const { id, homeTeamGoals, awayTeamGoals } = updatedMatchData;
    const match = await this.model.findOne({ where: { id } });

    const updatedMatch = { ...match, homeTeamGoals, awayTeamGoals };

    await this.model.update(updatedMatch, { where: { id } });
  }

  async createMatch(matchData: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = await this.model.create(matchData);

    const { id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress }: IMatch = newMatch;

    return { id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress };
  }
}
