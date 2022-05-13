import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import docs from '../docs/swagger.json';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';
import {studentRouter} from "./studentRouter";

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);
// @ts-ignore
// router.use('*', (err, req, res, next) => {
//     res
//         .status(err.status || 500)
//         .json({
//             message: err.message,
//         });
// });

export const apiRouter = router;
