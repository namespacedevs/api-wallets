
import { Wallet } from 'src/modules/wallets/entities/wallets.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;
  
  @OneToMany(() => Wallet, wallets => wallets.user)
  wallets: Wallet[];
}