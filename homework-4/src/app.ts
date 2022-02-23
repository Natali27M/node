// import express, { Request, Response } from 'express';
//
// import { users } from './users';
//
// const app = express();
// console.log(users);
//
// app.get('/', (req:Request, res:Response) => {
//     res.end();
// });
//
// app.listen(5500, () => {
//     console.log('Serves has started on PORT: http://localhost:5500');
// });

import express, { Request, Response } from 'express';
import { users } from './users';

const app = express();
console.log(users);

app.get('/', (req: Request, res: Response) => {
    res.end();
});

// const obj = {
//   x: 22,
//   y: 444,
// };

app.listen(5500, () => {
    console.log('Serves has started on PORT: http://localhost:5500');
    // console.log('Server has started🚀🚀🚀');
});
