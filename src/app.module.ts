import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { Wallet } from './modules/wallets/wallets.entity';
import { AssetsModule } from './modules/assets/assets.module';
import { Asset } from './modules/assets/entities/assets.entity';
import { User } from './modules/users/entities/users.entity';



@Module({
  imports: [
    UsersModule,
    AssetsModule,
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
