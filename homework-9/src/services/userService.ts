import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { userRepository } from '../repositories/user';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await UserService._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return userRepository.createUser(dataToSave);
    }

    public async updateUser(id:number, email:string, password:string):Promise<UpdateResult> {
        return userRepository.updateUser(id, email, password);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }

    public async deleteUser(id:number): Promise<void> {
        await userRepository.deleteUser(id);
    }

    private static async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
