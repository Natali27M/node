import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req:Request, res:Response) => {
  res.end();
});

app.listen(5500, () => {
  console.log('Serves has started on PORT: http://localhost:5500');
});
