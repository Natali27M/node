import { Request, Response } from 'express';

import { postService } from '../services';
import { IPost } from '../entity';

class PostController {
    public async getPosts(req: Request, res: Response): Promise<Response<IPost[]>> {
        const allPosts = await postService.getPosts();
        return res.json(allPosts);
    }

    public async getPostsUserById(req: Request, res: Response): Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const getAllPostsUserById = await postService.getPostsUserById(+userId);
        return res.json(getAllPostsUserById);
    }

    public async updatePostsById(req: Request, res: Response): Promise<Response<IPost>> {
        const { text } = req.body;
        const { id } = req.params;
        const post = await postService.getPostsById(+id, text);
        return res.json(post);
    }
}

export const postController = new PostController();
