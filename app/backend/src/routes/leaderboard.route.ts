import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.leaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.leaderboardHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.leaderboardAway(req, res),
);

export default router;
