import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.getUsers(req, res));
router.get('/:id', (req: Request, res: Response) => userController.getUserById(req, res));
router.post('/', (req: Request, res: Response) => userController.getUserByEmail(req, res));

export default router;
