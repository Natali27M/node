import nodemailer from 'nodemailer';
import { config } from '../config/config';

class EmailService {
    sendMail(userMail = '') {
        const emailTransporter = nodemailer.createTransport({
            from: 'No Replay Sep-2021',
            to: userMail,
            service: 'gmail',
            auth: {
                user: config.NO_REPLAY_EMAIL,
                pass: config.NO_REPLAY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject: 'HELLO WORLD',
            html: 'HELLO THIS US MAIL',
        });
    }
}

export const emailService = new EmailService();
