import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interface';
import { userRepository } from '../repositories/user';
import { paramValidators, userValidators } from '../validators';
import { ErrorHandler } from '../error/ErrorHandler';

class UserMiddleware {
    async checkIsUserExist(req:IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('User not found', 418));
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e) {
            // res.status(400).json(e);
            next(e);
        }
    }

    // async checkIsUserExistForCreate(req:IRequestExtended, res: Response, next: NextFunction)
    //     : Promise<void> {
    //     try {
    //         const { email, phone } = req.body;
    //         const userFromDb = await userRepository.getUserByEmailOrPhone(req.body.email);
    //
    //         if (userFromDb) {
    //             throw new Error('Error');
    //         }
    //
    //         next();
    //     } catch (e: any) {
    //         res.status(400).json(e.message);
    //     }
    // }

    async validateCreateUser(req:IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error, value } = userValidators.createUser.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
                // throw new Error('Пароль має мати :
                // цифру, спецсимвол, велику літеру, малу літеру і не менше 6 символів');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validateLoginUser(req:IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error, value } = userValidators.loginUser.validate(req.body);

            if (error) {
                throw new Error('Wrong email or password');
            }

            req.body = value;
            next();
        } catch (e) {
            // res.status(400).json(e.message);
            next(e);
        }
    }

    async validateId(req:IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error, value } = paramValidators.id.validate(req.params);

            if (error) {
                throw new Error('Wrong email or password');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
