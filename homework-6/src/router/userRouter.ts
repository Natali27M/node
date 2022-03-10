import { Router } from 'express';
import {userController} from "../controller/userController";

const router = Router();

router.post('/users',userController.createUser);

export const userRouter = router;
