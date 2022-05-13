import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import SocketIO from 'socket.io';
import mongoose from 'mongoose';

import { apiRouter } from './router';
import { config } from './config/config';
import {socketController} from "./controller/socketController";
// import { cronRun } from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*'}});

io.on('connection', (socket: any) => {
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);

    // socket.on('message:create', socketController.createMessage)
    socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));

    socket.on('join_room', (data: any) => {
        socket.join(data.id);
        console.log(data.id);
        console.log(`${socket.id}`);

        // socket.broadcast.to(data.id).emit('user_join_room', {message: `User ${socket.id} joined room ${data.id}`});
        io.to(data.id).emit('user_join_room', {message: `User ${socket.id} joined room ${data.id}`});
    });

});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/sept2021');

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

server.listen(PORT, async () => {
    console.log(`Serves has started on PORT:${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            // cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
