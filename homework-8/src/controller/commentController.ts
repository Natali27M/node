import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { IComment } from '../entity';
import { commentService } from '../services';
import { ICommentsAndPostsByUserId } from '../interface';

class CommentController {
    public async getComments(req:Request, res:Response):Promise<Response<IComment[]>> {
        const allComments = await commentService.getComments();
        return res.json(allComments);
    }

    public async getCommentsByUserId(req:Request, res:Response)
        :Promise<Response<ICommentsAndPostsByUserId[]>> {
        const { userId } = req.params;
        const commentsUser = await commentService.getCommentsByUserId(+userId);
        return res.json(commentsUser);
    }

    public async postLikeOrDislike(req:Request, res:Response)
        :Promise<Response<undefined | UpdateResult | Error>> {
        const { action, commentId } = req.body;
        const likeOrDislikes = await commentService.postLikeOrDislike(action, +commentId);
        return res.json(likeOrDislikes).sendStatus(201);
    }
}

export const commentController = new CommentController();
