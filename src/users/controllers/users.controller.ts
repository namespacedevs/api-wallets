import {
    Controller,
    Delete,
    Get,
    Put,
    Post,
    Param,
    Body,
} from "@nestjs/common";
import { CreateUsersDto } from "../dtos/create-users.dto";
import { UsersService } from "../providers/users.service";
import { UpdateUsersDto } from "../dtos/update-users.dto";
import { User } from "../users.entity";

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
    async create(@Body() create: CreateUsersDto) {
        return this.userService.create(create);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() update: UpdateUsersDto) {
        return this.userService.update(id, update);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }
}