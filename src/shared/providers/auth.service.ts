import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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