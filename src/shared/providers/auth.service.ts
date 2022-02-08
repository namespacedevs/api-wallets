import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/users.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
    ) {}
    async createToken(id: number) {
        const user: JwtPayload = { 
            id: id,
        }
        return this.jwtService.sign(user);
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return payload;
    }   
}