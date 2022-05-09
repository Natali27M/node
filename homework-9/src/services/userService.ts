import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { userRepository } from '../repositories/user';
import { config } from '../config/config';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async updateUser(id:number, email:string, password:string):Promise<UpdateResult> {
        return userRepository.updateUser(id, email, password);
    }

    public async updateUser2(id: number, obj: Partial<IUser>): Promise<object | undefined> {
        if (obj.password) {
            // eslint-disable-next-line no-param-reassign
            obj.password = await this._hashPassword(obj.password);
        }

        return userRepository.updateUser2(id, obj);
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

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
