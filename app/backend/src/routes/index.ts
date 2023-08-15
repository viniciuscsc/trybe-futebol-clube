import { Router } from 'express';
import teamRouter from './team.route';
import userRouter from './user.route';
import loginRouter from './login.route';
import matchRouter from './match.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
