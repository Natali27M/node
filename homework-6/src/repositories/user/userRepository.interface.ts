import { IUser } from '../../entity/user';

export interface UserRepositoryInterface {
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
}
