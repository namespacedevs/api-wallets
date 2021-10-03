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
    get() {
        return 'Obter os usuários';
    }
    @Get(':CPF')
    getById(@Param('CPF') CPF) {
        return 'Obter o usuário ' + CPF;
    }
0
    @Post()
    post(@Body() body) {
        return body;
    }

    @Put(':CPF')
    put(@Param('CPF') CPF, @Body() body) {
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