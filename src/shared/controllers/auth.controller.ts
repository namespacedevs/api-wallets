import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { LoginDto } from "../../users/dtos/login.dto";
import { UsersService } from "../../users/services/users.service";
import { ResultLogin } from "../dtos/result-login.dto";
import { Result } from "../dtos/result.dto";
import { AuthService } from "../providers/auth.service";

@Controller('/')
export class AuthController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() model: LoginDto): Promise <any>{
        const user = await this.usersService.login(model.document, model.password);
    
        if(!user)
        throw new HttpException(new Result('Usuário ou senha invalido!', null, false, null), HttpStatus.UNAUTHORIZED);
    
        const token = await this.authService.createToken(user.id)
        return new ResultLogin( user.id, token );
    }
}