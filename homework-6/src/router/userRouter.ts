import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.delete('/', userController.deleteUser);

export const userRouter = router;
