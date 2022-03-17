import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constants/cookie';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req: Request, res: Response):Promise<Response<string>> {
        console.log('---------');
        console.log(req);
        console.log('---------');

        console.log(req.body);

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(0);

        return res.json('Ok');
    }
}

export const authController = new AuthController();
