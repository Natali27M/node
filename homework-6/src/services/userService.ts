import bcrypt from 'bcrypt';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    //     app.get('/users', async (req: Request, res: Response) => {
//     const users = await getManager().getRepository(User).find({ relations: ['posts'] });
//     res.json(users);
// });
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async deleteUser(id:number): Promise<void> {
        return userRepository.deleteUser(id);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
