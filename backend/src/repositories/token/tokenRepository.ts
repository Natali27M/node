import { getManager, Repository } from 'typeorm';

import { IToken, Token } from '../../entity';

class TokenRepository extends Repository<Token> {
    public async createToken(token: any):Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public findByParams(findObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(findObject);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteByParams(findObject: Partial<IToken>) {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
