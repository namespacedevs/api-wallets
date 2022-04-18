import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, JoinColumn } from 'typeorm';
import { Asset } from 'src/assets/entities/assets.entity';
import { User } from 'src/users/entities/users.entity';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToOne(() => User, user => user.wallets)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToMany(() => Asset)
  @JoinTable( { name: 'wallets_assets' } )
  assets: Asset[];
}
