import { UpdateResult } from 'typeorm';

import { IUser } from '../../entity';

export interface IUserRepository {
    getUser(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: number, email:string, password:string): Promise<UpdateResult>
    getUserByEmail(email: string): Promise<IUser | undefined>;
    deleteUser(id:number): Promise<UpdateResult>;
}
