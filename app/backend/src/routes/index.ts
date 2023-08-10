import { Router } from 'express';
import teamRouter from './team.route';
import userRouter from './user.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/users', userRouter);

export default router;
