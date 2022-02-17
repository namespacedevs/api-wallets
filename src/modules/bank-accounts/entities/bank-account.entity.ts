import { User } from 'src/modules/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('bank_account')
export class BankAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bankName: string;

    @ManyToOne(() => User, user => user.bankAccount)
    @JoinColumn({ name: 'userId' })
    userId: User;
    bankAccount: any;
}
