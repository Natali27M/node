import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User).find({relations:['posts']});
    console.log(users)
    res.json(users);
    // const user = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId=user.id')
    //     .where('posts.text="asd"')
    //     .getMany();
    // res.json(user);
});

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.patch('/users/:id', async (req, res) => {
    const {password, email} = req.body;
    const updateUser = await getManager().getRepository(User).update({id: Number(req.params.id)}, {
        password,
        email,
    });
    res.json(updateUser);
});

app.delete('/users/:id', async (req, res) => {
    const deleteUser = await getManager().getRepository(User).delete({id: Number(req.params.id)});
    res.json(deleteUser);
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
