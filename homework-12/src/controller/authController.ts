import { NextFunction, Request, Response } from 'express';

import { UploadedFile } from 'express-fileupload';
import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { constants, EmailActionEnum } from '../constants';
import { IRequestExtended } from '../interface';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories/token';
import { actionTokenRepository } from '../repositories/actionToken';
import { ActionTokenTypes } from '../enums/actionTokenTypesEnum';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction):
        Promise<void> {
        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDb = await userService.getUserByEmail(email);

            if (userFromDb) {
                throw new Error(`User with email : ${email} already exists`);
            }

            const createdUser = await userService.createUser(req.body);

            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);

                console.log(sendData.Location);
            }

            const tokenData = await authService.registration(createdUser);

            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(EmailActionEnum.WELCOME, email, { userName: 'Natalya' });

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
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response):Promise<Response<string>> {
        const { id } = req.user as IUser;

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
            next(e);
        }
    }

    async sendForgotPassword(req: IRequestExtended, res: Response, next:NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService
                .generateActionToken({ userId: id, userEmail: email });

            await actionTokenRepository.createActionToken(
                { actionToken: token, type: ActionTokenTypes.forgotPassword, userId: id },
            );

            await emailService.sendMail(
                EmailActionEnum.FORGOT_PASSWORD,
                email,
                { token, userName: firstName },
            );

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req: IRequestExtended, res: Response, next:NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(constants.AUTHORIZATION);

            await userService.updateUser2(id, req.body);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
