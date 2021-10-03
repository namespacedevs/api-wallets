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
        return 'Obter um usuário';
    }
    @Get(':CPF')
    getById(@Param('CPF') CPF) {
        return 'Obter um usuário' + CPF;
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

    @Delete()
    delete(@Body() body) {
        return body;
    }
}