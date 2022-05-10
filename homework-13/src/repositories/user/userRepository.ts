import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interface';
import { IPaginationResponse } from '../../interface';

dayjs.extend(utc);

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(id: number, email: string, password: string): Promise<UpdateResult> {
        return getManager().getRepository(User)
            .update({ id }, {
                password,
                email,
            });
    }

    public async updateUser2(id: number, user: Partial<IUser>): Promise<object> {
        return getManager().getRepository(User).update({ id }, user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async deleteUser(id: number): Promise<UpdateResult> {
        return getManager().getRepository(User).softDelete({ id });
    }

    getUser(): Promise<IUser[]> {
        return Promise.resolve([]);
    }

    public async getNewUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', { date: dayjs().utc().startOf('day').format() })
            .getMany();
    }

    public async getUserPagination(
        searchObject: Partial<IUser> = {},
        limit: number = 25,
        page: number = 1,
    )
        : Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);

        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}

export const userRepository = new UserRepository();
