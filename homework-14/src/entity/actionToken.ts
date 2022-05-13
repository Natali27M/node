import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';
import { ActionTokenTypes } from '../enums/actionTokenTypesEnum';

export interface IActionToken {
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

export interface IActionTokenForSave {
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

@Entity('ActionTokens', { database: 'node' })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        type: ActionTokenTypes;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
