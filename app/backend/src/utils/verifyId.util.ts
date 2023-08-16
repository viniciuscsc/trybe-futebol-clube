import MatchModel from '../models/MatchModel';

import { IMatch } from '../Interfaces/matches/IMatch';

export default async function verifyId(id: number): Promise<IMatch | null> {
  const matchModel = new MatchModel();
  const match = await matchModel.findById(id);
  return match;
}
