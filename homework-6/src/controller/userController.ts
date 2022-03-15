import { Request, Response } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
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
        const deleteUser = await userService.deleteUser(id);
        res.json(deleteUser);
    }

//     app.delete('/users/:id', async (req, res) => {
//     const deleteUser = await getManager().getRepository(User)
//         .softDelete({ id: Number(req.params.id) });
//     res.json(deleteUser);
// });
}

export const userController = new UserController();
