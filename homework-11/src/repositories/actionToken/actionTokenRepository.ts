import { getManager, Repository, EntityRepository } from 'typeorm';

import { ActionToken, IActionToken, IActionTokenForSave } from '../../entity';
import { IActionTokenRepository } from '.';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    async createActionToken(token: IActionTokenForSave) : Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    async findByParams(filterObject: Partial<IActionToken>) : Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(filterObject);
    }

    async deleteByParams(filterObject: Partial<IActionToken>) {
        return getManager().getRepository(ActionToken).delete(filterObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
