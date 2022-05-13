import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IComment, Comment } from '../../entity';
import { ICommentRepository } from './commentRepository.interface';
import { ICommentsAndPostsByUserId } from '../../interface/commentsAndPostsByUserId.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async getCommentsByUserId(userId:number):Promise<ICommentsAndPostsByUserId[] | object> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :userId', { userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    // eslint-disable-next-line consistent-return
    public async postLikeOrDislike(action:string, commentId:number)
        :Promise<undefined | UpdateResult | Error> {
        try {
            const queryRunner = getManager().getRepository(Comment);
            const comment = await queryRunner.createQueryBuilder('comment')
                .where('comment.id = :id', { id: commentId })
                .getOne();

            if (!comment) {
                throw new Error('wrong comment ID');
            }

            if (action === 'like') {
                return queryRunner.update({ id: commentId }, { like: comment.like + 1 });
            }
            if (action === 'dislike') {
                return queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const commentRepository = new CommentRepository();
