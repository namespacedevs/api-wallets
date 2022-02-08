import { Controller, Delete, Get, Put, Post, Param, Body, UseInterceptors, HttpException, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { CreateUsersDto } from "../dtos/create-users.dto";
import { UsersService } from "../providers/users.service";
import { UpdateUserDto } from "../dtos/update-users.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateUserContract } from "../contracts/create-user.contract";
import { Result } from "src/shared/dtos/result.dto";
import { UpdateUserContract } from "../contracts/update-user.contract";
import { AuthService } from "src/shared/providers/auth.service";
import { LoginDto } from "src/modules/users/dtos/login.dto";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";

@Controller('v1/users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() { 
        try{
            const users = await this.usersService.findAll();
            return new Result('Lista dos usuários.', true, users, null);
        }
        catch(error){
            throw new HttpException(new Result( 'Não foi possivel listar os usuários.', false, null, error), HttpStatus.BAD_REQUEST);
        }    
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        try{
            const user = await this.usersService.findOne(id);
            return new Result('Usuário solicitado.', true, user, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel listar o usuário.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async create(@Body() createUser: CreateUsersDto) {
        try{
            const newUser = await this.usersService.create(createUser);
            return new Result('Usuário criado com sucesso.', true, newUser, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel criar o usuário.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UseInterceptors(new ValidatorInterceptor(new UpdateUserContract()))
    async update(@Param('id') id: number, @Body() update: UpdateUserDto) {
        try{
            const updateUser = await this.usersService.update(id, update);
            return new Result('Usuário alterado com sucesso.', true, updateUser, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel alterar o usuário.', false, null, error), HttpStatus.BAD_REQUEST); 
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try{
            await this.usersService.delete(id);
            return new Result('Usuário deletado com sucesso.', true, null, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel deletar o usuário.', false, null, error), HttpStatus.BAD_REQUEST); 
        }
    }

    @Post('login')
    async login(@Body() model: LoginDto): Promise <any>{
        const user = await this.usersService.login(model.document, model.password);
    
        if(!user)
        throw new HttpException(new Result('Usuário ou senha invalido!', null, false, null), HttpStatus.UNAUTHORIZED);
    
        const token = await this.authService.createToken(user.id)
        return new Result(null, true, token, null);
    }
}