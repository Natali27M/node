import { Request, Response } from 'express';
import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async getUsers(req: Request, res: Response) : Promise<Response<IUser[]>> {
        const allUsers = await userService.getUsers();
        return res.json(allUsers);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async updateUser(req: Request, res: Response): Promise<Response<IUser>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updateUser = await userService.updateUser(+id, password, email);
        return res.json(updateUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async deleteUser(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        await userService.deleteUser(+id);
        res.json('User deleted');
    }
}

export const userController = new UserController();
