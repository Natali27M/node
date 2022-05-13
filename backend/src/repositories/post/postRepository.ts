import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getPosts(): Promise<IPost[]> {
        return getManager().getRepository(Post).find();
    }

    public async getPostsUserById(userId: number): Promise<IPost[]> {
        return getManager().getRepository(Post)
            .find({ userId });
    }

    public async updatePostsById(id: number, text: string): Promise<UpdateResult> {
        return getManager().getRepository(Post)
            .update({ id }, {
                text,
            });
    }
}

export const postRepository = new PostRepository();
