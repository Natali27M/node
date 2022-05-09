import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import fileUpload from 'express-fileupload';

import { apiRouter } from './router';
import { config } from './config/config';
import { cronRun } from './cron';

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Serves has started on PORT:${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
