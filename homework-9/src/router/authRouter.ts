import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authController.registration);
router.post(
    '/login',
    authMiddleware.isLoginValid,
    // userMiddleware.validateLoginUser,
    userMiddleware.checkIsUserExist,
    authController.login,
);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post(
    '/forgotPassword',
    authMiddleware.checkValidEmail,
    userMiddleware.checkIsUserExist,
    authController.sendForgotPassword,
);

export const authRouter = router;
