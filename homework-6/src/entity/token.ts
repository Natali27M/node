import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IToken {
    refreshToken: string;
    userId: number;
}

@Entity('Tokens', { database: 'node' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}

// import {
//     Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
// } from 'typeorm';
//
// import { User } from './user';
//
// export interface IToken {
//     id: number;
//     refreshToken: string;
//     userId: number;
// }
//
// @Entity('Tokens', { database: 'node' })
// // export class Token extends CommonFields implements IToken {
// export class Token implements IToken {
//     @PrimaryGeneratedColumn()
//         id: number;
//
//     @Column({
//         type: 'varchar',
//         width: 255,
//         nullable: false,
//     })
//         refreshToken: string;
//
//     @Column({
//         type: 'int',
//     })
//         userId: number;
//
//     @OneToOne(() => User)
//     @JoinColumn({ name: 'userId' })
//         user: User;
// }
