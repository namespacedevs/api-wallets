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
import { UsersModel } from "../model/users.model";
import { UsersService } from "../providers/users.service";
import { UpdateUsersDto } from "../dtos/update-users.dto";

@Controller('v1/users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) { }

    @Get()
    findAll(): Promise<UsersModel[]> {
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<UsersModel> {
        return this.userService.findOne(id);
    }
    @Post()
    async create(@Body() createDto: CreateUsersDto) {
        return this.userService.createDto(createDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUsersDto) {
        return this.userService.updateDto(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }
}