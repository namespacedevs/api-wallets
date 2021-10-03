import {
    Controller,
    Delete,
    Get,
    Put, 
    Post,
    Param,
    Body
    } from "@nestjs/common";

@Controller('v1/users')
export class UserController {
    @Get()
    findAll(): string {
        return 'Obter os usuários';
    }
    @Get(':CPF')
    getById(@Param('CPF') CPF) {
        return 'Obter o usuário ' + CPF;
    }
    @Post()
    create(@Body() body) {
        return body;
    }

    @Put(':CPF')
    update(@Param('CPF') CPF, @Body() body) {
        return{
            user: CPF,
            data: body,
        };
    }

    @Delete(':CPF')
    delete(@Param('CPF') CPF) {
        return "Usuário removido com sucesso";
    }
}