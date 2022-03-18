import { UpdateResult } from 'typeorm';

import { IComment } from '../../entity';
import { ICommentsAndPostsByUserId } from '../../interface/commentsAndPostsByUserId.interface';

export interface ICommentRepository {
    getComments(): Promise<IComment[]>
    getCommentsByUserId(req: number, res: Response):Promise<ICommentsAndPostsByUserId[] | object>
    postLikeOrDislike(action:string, commentId:number)
        : Promise<undefined | UpdateResult | Error>
}
