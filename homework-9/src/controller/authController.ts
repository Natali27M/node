import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import {COOKIE, emailActionEnum} from '../constants';
import { IRequestExtended } from '../interface';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories/token';

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await authService.registration(req.body);
            res.cookie(
                COOKIE.nameRefreshToken,
                data.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            // return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(emailActionEnum.WELCOME, email);

            await userService.compareUserPasswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService
                .generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            // res.status(401).json({
            //     status: 401,
            //     message: e.message,
            // });
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response):Promise<Response<string>> {
        const { id } = req.user as IUser;

        // res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async refreshToken(req: IRequestExtended, res: Response, next:NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { accessToken, refreshToken } = await tokenService
                .generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            // res.status(401).json({
            //     status: 401,
            //     message: e.message,
            // });
            next(e);
        }
    }
}

export const authController = new AuthController();
