import { UpdateResult } from 'typeorm';

import { IPost } from '../../entity';

export interface IPostRepository {
    getPosts(): Promise<IPost[]>;
    getPostsUserById(userId: number): Promise<IPost[]>;
    updatePostsById(id: number, text: string): Promise<UpdateResult>;
}
