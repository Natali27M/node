import { IUser, IPost } from '../entity';

export interface ICommentsAndPostsByUserId {
    id: number;
    createdAt: string;
    deletedAt?: string;
    text: string;
    authorId: number;
    postId: number;
    like: number;
    dislike: number;
    user: IUser;
    posts:IPost;
}
