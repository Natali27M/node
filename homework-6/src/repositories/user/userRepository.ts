import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity/user';
import { UserRepositoryInterface } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements UserRepositoryInterface {
    public async getUsers() : Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

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

    public async deleteUser(id:number): Promise<any> {
        return getManager().getRepository(User).softDelete({ id });
    }
}

export const userRepository = new UserRepository();
