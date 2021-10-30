import {
    Controller,
    Delete,
    Get,
    Put,
    Post,
    Param,
    Body,
} from "@nestjs/common";
import { UserModel } from "../model/user.model";
import { UserService } from "../providers/user.service";

@Controller('v1/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    async findAll(): Promise<UserModel[]> {
        return this.userService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UserModel> {
        return this.userService.findOne(id);
    }
    //@Post()
    //create(@Body() createDto: CreateUserDto) {
    //    return this.userService.create(createDto);
    // }

    //@Put(':document')
    //update(@Param('document') document: number, @Body() updateUserDto: CreateUserDto) {
    //    console.log(updateUserDto);
    //    return this.userService.update(document, updateUserDto);
    //}

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id); 
    }
}