import { userService } from './userService';
import { IUser } from '../entity';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(body:IUser) {
        const { email } = body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email : ${email} already exists`);
        }
        const createdUser = await userService.createUser(body);

        return AuthService._getTokenData(createdUser);
    }

    private static async _getTokenData(userData: IUser) {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokensPair.refreshToken, tokensPair.accessToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
