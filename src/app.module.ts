import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { WalletsModule } from './wallets/wallets.module';
import { Wallet } from './wallets/wallets.entity';
import { Asset } from './assets/assets.entity';
import { AssetsModule } from './assets/assets.module';


@Module({
  imports: [
    UsersModule,
    WalletsModule,
    AssetsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'api_wallets',
      entities: [User, Wallet, Asset],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
