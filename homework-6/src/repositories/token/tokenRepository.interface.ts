import { IToken } from '../../entity';

export interface ITokenRepository{
    createToken(token: any): Promise<IToken>;

    findTokenByUserId(userId: number): Promise<IToken | undefined>;
}
