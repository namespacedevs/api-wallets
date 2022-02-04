
import { Asset } from 'src/modules/assets/entities/assets.entity';
import { User } from 'src/modules/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToOne(() => User, user => user.wallets)
  user: User;

  @ManyToMany(() => Asset)
  @JoinTable()
  assets: Asset[];
}
