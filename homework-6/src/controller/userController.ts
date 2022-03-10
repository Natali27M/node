import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { IUser, User } from '../entity/user';
class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await getManager().getRepository(User).save(req.body);
        return res.json(createdUser);
    }
}

export const userController = new UserController();
