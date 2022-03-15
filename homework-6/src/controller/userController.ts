import { Request, Response } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
//     app.get('/users', async (req: Request, res: Response) => {
//     const users = await getManager().getRepository(User).find({ relations: ['posts'] });
//     res.json(users);
// });
    public async getUsers(req: Request, res: Response) : Promise<Response<IUser[]>> {
        const users = req.body;
        await userService.getUsers();
        return res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
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
