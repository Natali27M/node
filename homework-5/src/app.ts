// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі

import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import {Post} from "./entity/post";
import {Comment} from "./entity/comment";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        res.json(users);
    } catch (e) {
        console.log(e);
    }
    // const user = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId=user.id')
    //     .where('posts.text="asd"')
    //     .getMany();
    // res.json(user);
});

app.post('/users', async (req, res) => {
    try {
        const createdUser = await getManager().getRepository(User).save(req.body);
        res.json(createdUser);
    } catch (e) {
        console.log(e);
    }
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updateUser = await getManager().getRepository(User).update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(updateUser);
});

app.delete('/users/:id', async (req, res) => {
    const deleteUser = await getManager().getRepository(User).softDelete({ id: Number(req.params.id) });
    res.json(deleteUser);
});

app.get('/posts', async (req: Request, res: Response) => {
    try {
        const posts = await getManager().getRepository(Post).find();
        res.json(posts);
    } catch (e) {
        console.log(e);
    }
});

app.get('/posts/:userId', async (req, res) => {
    try {
        const posts = await getManager().getRepository(Post).find({ userId: Number(req.params.userId) } );
        res.json(posts);
    } catch (e) {
        console.log(e);
    }
});

// app.get('/posts/:userId', async (req: Request, res: Response) => {
//     try {
//         const user = await getManager().getRepository(Post)
//             .createQueryBuilder('post')
//             .where('post.userId = :id', { id: +req.params['userId'] })
//             .leftJoin('User', 'user', 'user.id = post.userId')
//             .getMany();
//         res.json(user);
//     } catch (e) {
//         console.log(e);
//     }
// });

app.patch('/posts/:id', async (req, res) => {
    const { text } = req.body;
    const updateUser = await getManager().getRepository(Post).update({ id: Number(req.params.id) }, {
        text
    });
    res.json(updateUser);
});

// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
app.get('/comments', async (req: Request, res: Response) => {
    try {
        const comments = await getManager().getRepository(Comment).find();
        res.json(comments);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments/:userId', async (req: Request, res: Response) => {
    try {
        const comments = await getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +req.params['userId'] })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    } catch (e) {
        console.log(e);
    }
});

app.post('/comments/action', async (req: Request, res: Response) => {
    try {
        const { action, commentId } = req.body;
        const queryRunner = getManager().getRepository(Comment);
        const comment = await queryRunner.createQueryBuilder('comment')
            .where('comment.id = :id', { id: commentId })
            .getOne();

        if (!comment) {
            throw new Error('wrong comment ID');
        }

        if (action === 'like') {
            await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
        }

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
    }
});

app.listen(5500, async () => {
    console.log('Serves has started on PORT: http://localhost:5500');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
