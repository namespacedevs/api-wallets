import {
    Controller,
    Delete,
    Get,
    Put,
    Post,
    Param,
    Body,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserModel } from "../model/user.model";
import { UserService } from "../providers/user.service";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Controller('v1/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    findAll(): Promise<UserModel[]> {
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<UserModel> {
        return this.userService.findOne(id);
    }
    @Post()
    async create(@Body() createDto: CreateUserDto) {
        return this.userService.createDto(createDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateDto(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }
}