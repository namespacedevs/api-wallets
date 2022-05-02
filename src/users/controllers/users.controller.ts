import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { Result } from "../../shared/dtos/result.dto";
import { JwtAuthGuard } from "../../shared/guards/auth.guard";
import { ValidatorInterceptor } from "../../shared/interceptors/validator.interceptor";
import { AuthService } from "../../shared/providers/auth.service";
import { CreateUserContract } from "../contracts/create-user.contract";
import { UpdateUserContract } from "../contracts/update-user.contract";
import { CreateUsersDto } from "../dtos/create-users.dto";
import { LoginDto } from "../dtos/login.dto";
import { UpdateUserDto } from "../dtos/update-users.dto";
import { UsersService } from "../providers/users.service";


@Controller('v1/users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        try {
            const users = await this.usersService.findAll();
            return new Result('Lista dos usuários.', true, users, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possivel listar os usuários.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: number) {
        try {
            const user = await this.usersService.findOne(id);
            if (!user) {
                return new Result('Usuário não encontrado', true, null, null);
            }
            return new Result('O usuário solicitado', true, user, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possivel listar o usuário.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async create(@Body() createUser: CreateUsersDto) {
        try {
            const newUser = await this.usersService.create(createUser);
            return new Result('Usuário criado com sucesso.', true, newUser, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possivel criar o usuário.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new ValidatorInterceptor(new UpdateUserContract()))
    async update(@Param('id') id: number, @Body() update: UpdateUserDto) {
        try {
            const updateUser = await this.usersService.update(id, update);
            if (updateUser.affected !== 0) {
                return new Result('Usuário alterado com sucesso.', true, updateUser, null);
            }
            return new Result('Usuário não encontrado', true, null, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possivel alterar o usuário.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number) {
        try {
            await this.usersService.delete(id);
            return new Result('Usuário deletado com sucesso.', true, null, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possivel deletar o usuário.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() model: LoginDto): Promise<any> {
        const user = await this.usersService.login(model.document, model.password);

        if (!user)
            throw new HttpException(new Result('Usuário inesistente ou senha inválida!', false, null, null), HttpStatus.UNAUTHORIZED);

        const token = await this.authService.createToken(user.id)
        return new Result(null, true, token, null);
    }
}