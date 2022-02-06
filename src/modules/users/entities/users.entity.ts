
import { Wallet } from 'src/modules/wallets/entities/wallets.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}