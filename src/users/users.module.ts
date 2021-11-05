import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './providers/users.service';
import { Users } from './users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
