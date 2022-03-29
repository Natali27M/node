import nodemailer from 'nodemailer';
import { config } from '../config/config';
import { emailActionEnum, emailInfo } from '../constants';

class EmailService {
    sendMail(action: emailActionEnum, userMail = '') {
        const { subject, html } = emailInfo[action];
        const emailTransporter = nodemailer.createTransport({
            from: 'No Replay Sep-2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLAY_EMAIL,
                pass: config.NO_REPLAY_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
