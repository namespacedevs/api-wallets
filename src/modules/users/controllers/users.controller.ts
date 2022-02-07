import { Controller, Delete, Get, Put, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUsersDto } from "../dtos/create-users.dto";
import { UsersService } from "../providers/users.service";
import { UpdateUserDto } from "../dtos/update-users.dto";
import { User } from "../entities/users.entity";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateUserContract } from "../contracts/create-user.contract";
import { Result } from "src/shared/entities/result.entity";
import { UpdateUserContract } from "../contracts/update-user.contract";

@Controller('v1/users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async create(@Body() model: CreateUsersDto) {
        try{
            const newUser = await this.userService.create(model);
            return new Result('Usuário criado.', true, [newUser.name, newUser.email], null);
        }
        catch(error){
            throw new HttpException(new Result('Email ou CPF já cadastrados.', false, null, error), HttpStatus.BAD_REQUEST); 
        }
    }

    @Put(':id')
    @UseInterceptors(new ValidatorInterceptor(new UpdateUserContract()))
    async update(@Param('id') id: number, @Body() update: UpdateUserDto) {
        try{
            const updateUser = await this.userService.update(id, update);
            return new Result('Usuário criado.', true, updateUser, null);
        }
        catch(error){
            throw new HttpException(new Result('Email ou CPF já cadastrados.', false, null, error), HttpStatus.BAD_REQUEST); 
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }
}