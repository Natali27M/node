import { UpdateResult } from 'typeorm';

import { IUser } from '../../entity';
// import { IPaginationResponse } from '../../interface';

export interface IUserRepository {
    getUser(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: number, email:string, password:string): Promise<UpdateResult>
    getUserByEmail(email: string): Promise<IUser | undefined>;
    deleteUser(id:number): Promise<UpdateResult>;
    getNewUsers(): Promise<IUser[]>;
    // getUserPagination(): Promise<IPaginationResponse<IUser>>
}
