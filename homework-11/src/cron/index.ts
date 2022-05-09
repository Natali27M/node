import { getNewUser } from './get-new-users';

export const cronRun = () => {
    console.log('Cron was started');
    getNewUser();
};
