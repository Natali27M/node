import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constants/cookie';
import { IRequestExtended } from '../interface';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        console.log(data);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }
    // // eslint-disable-next-line consistent-return
    // public async registration(req: Request, res: Response)
    // : Promise<Response<string> | undefined> {
    //     try {
    //         const data = await authService.registration(req.body);
    //         res.cookie(
    //             COOKIE.nameRefreshToken,
    //             data.refreshToken,
    //             { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
    //         );
    //         return res.json(data);
    //     } catch (e) {
    //         res.json(e);
    //     }
    // }

    public async logout(req: IRequestExtended, res: Response):Promise<Response<string>> {
        // console.log('---------');
        console.log(req.user);
        // console.log('---------');
        //
        // console.log(req.body);

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(3);

        return res.json('Ok');
    }
}

export const authController = new AuthController();
