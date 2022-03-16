import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers() : Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(id: number, email:string, password:string): Promise<UpdateResult> {
        return getManager().getRepository(User)
            .update({ id }, {
                password,
                email,
            });
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async deleteUser(id:number): Promise<UpdateResult> {
        return getManager().getRepository(User).softDelete({ id });
    }

    getUser(): Promise<IUser[]> {
        return Promise.resolve([]);
    }
}

export const userRepository = new UserRepository();
