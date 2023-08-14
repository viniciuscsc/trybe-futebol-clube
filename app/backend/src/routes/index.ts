import { Router } from 'express';
import teamRouter from './team.route';
import userRouter from './user.route';
import loginRouter from './login.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);

export default router;
