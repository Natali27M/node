import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config/config';
import { constants, EmailActionEnum, emailInfo } from '../constants';

class EmailService {
    templateRenderer = new EmailTemplate({
        views: {
            root: path.join(__dirname, '../', 'email-templates'),
        },
    });

    async sendMail(action: EmailActionEnum, userMail = '', context = {}): Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: constants.FRONTEND_URL });

        const html = await this.templateRenderer.render(templateName, context);

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
