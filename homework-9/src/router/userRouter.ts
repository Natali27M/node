import { Router } from 'express';
import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/:email', userController.getUserByEmail);
router.get('/', userController.getUsers);
router.post('/', userMiddleware.validateCreateUser, userController.createUser);
router.patch('/:id', userMiddleware.validateId, userController.updateUser);
router.delete('/:id', userMiddleware.validateId, userController.deleteUser);

export const userRouter = router;
