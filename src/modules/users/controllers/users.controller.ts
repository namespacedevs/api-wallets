import { Controller, Delete, Get, Put, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUsersDto } from "../dtos/create-users.dto";
import { UsersService } from "../providers/users.service";
import { UpdateUserDto } from "../dtos/update-users.dto";
import { User } from "../entities/users.entity";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateUserContract } from "../contracts/create-user.contract";
import { Result } from "src/shared/dtos/result.dto";
import { UpdateUserContract } from "../contracts/update-user.contract";

@Controller('v1/users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Get()
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
}