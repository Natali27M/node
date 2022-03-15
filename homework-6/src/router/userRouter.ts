import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

router.get('/:email', userController.getUserByEmail);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
