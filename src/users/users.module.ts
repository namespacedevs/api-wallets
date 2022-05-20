import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/users.entity';
import { AuthService } from '../shared/providers/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../shared/strategies/jwt-strategy';
import { AuthController } from '../shared/controllers/auth.controller';
import 'dotenv/config';



@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: "365d",
            },
        }),
        TypeOrmModule.forFeature([User])
    ],
    
    controllers: [UsersController, AuthController],
    providers: [UsersService, AuthService, JwtStrategy]
})
export class UsersModule {}
