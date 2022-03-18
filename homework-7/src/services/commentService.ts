import { UpdateResult } from 'typeorm';

import { IComment } from '../entity';
import { commentRepository } from '../repositories/comment';
import { ICommentsAndPostsByUserId } from '../interface/commentsAndPostsByUserId.interface';

class CommentService {
    public async getComments():Promise<IComment[]> {
        return commentRepository.getComments();
    }

    public async getCommentsByUserId(userId:number):Promise<ICommentsAndPostsByUserId[] | object> {
        return commentRepository.getCommentsByUserId(userId);
    }

    public async postLikeOrDislike(action:string, commentId:number)
        :Promise<undefined | UpdateResult | Error> {
        return commentRepository.postLikeOrDislike(action, commentId);
    }
}

export const commentService = new CommentService();
