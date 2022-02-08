import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './providers/users.service';
import { User } from './entities/users.entity';
import { AuthService } from 'src/shared/providers/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/stratigies/jwt-strategy';
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
    
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtStrategy]
})
export class UsersModule {}
