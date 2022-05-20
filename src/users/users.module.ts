import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './controllers/users.controller';
import { AuthController } from '../shared/controllers/auth.controller';
import { UsersService } from './providers/users.service';
import { AuthService } from '../shared/providers/auth.service';
import { User } from './entities/users.entity';
import { JwtStrategy } from '../shared/strategies/jwt-strategy';

import 'dotenv/config';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([User])
    ],
    
    controllers: [UsersController, AuthController],
    providers: [UsersService, AuthService, JwtStrategy]
})
export class UsersModule {}
