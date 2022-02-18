import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { AssetsModule } from './assets/assets.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { User } from './users/entities/users.entity';
import { Wallet } from './wallets/entities/wallets.entity';
import { Asset } from './assets/entities/assets.entity';
import { BankAccount } from './bank-accounts/entities/bank-account.entity';
import 'dotenv/config';

@Module({
  imports: [
    UsersModule,
    AssetsModule,
    WalletsModule,
    BankAccountsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [User, Wallet, Asset, BankAccount],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
