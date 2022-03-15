import { EntityRepository, getManager, Repository } from 'typeorm';
import { Request, Response } from 'express';

import { IUser, User } from '../../entity/user';
import { UserRepositoryInterface } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements UserRepositoryInterface {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async deleteUser(id): Promise<void > {
        return getManager().getRepository(User).softDelete(id);
    }

    // public async getUserByEmail(id: string): Promise<IUser | undefined> {
    //     return getManager().getRepository(User)
    //         .createQueryBuilder('user')
    //         .where('user.id= :id', { id })
    //         .andWhere('user.deletedAt IS NULL')
    //         .getOne();
    // }
}

export const userRepository = new UserRepository();
