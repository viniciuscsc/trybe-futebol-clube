import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getMatches(req, res));
router.put(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.endGame(req, res),
);

export default router;
