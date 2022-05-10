import cron from 'node-cron';

import { userRepository } from '../repositories/user';

export const getNewUser = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Work start get with new users');
        const newUsers = await userRepository.getNewUsers();

        console.log(newUsers);
    });
};
