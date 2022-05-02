import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Wallet } from '../../wallets/entities/wallets.entity';
import { BankAccount } from '../../bank-accounts/entities/bank-account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  document: string;

  @Column()
  password: string;
  
  @OneToMany(() => Wallet, wallets => wallets.userId)
  wallets: Wallet[];

  @OneToMany(() => BankAccount, bankAccount => bankAccount.userId)
  bankAccounts: BankAccount[];
}
