import { UpdateResult } from 'typeorm';

import { postRepository } from '../repositories/post';
import { IPost } from '../entity';

class PostService {
    public async getPosts(): Promise<IPost[]> {
        return postRepository.getPosts();
    }

    public async getPostsUserById(userId:number):Promise<IPost[]> {
        return postRepository.getPostsUserById(userId);
    }

    public async getPostsById(id:number, text:string):Promise<UpdateResult> {
        return postRepository.updatePostsById(id, text);
    }
}
export const postService = new PostService();
