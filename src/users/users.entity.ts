
import { Wallet } from 'src/wallets/wallets.entity';
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
  
  @OneToMany(type => Wallet, wallets => wallets.owner)
  wallets: Wallet[];
}