import {
    Controller,
    Delete,
    Get,
    //Put, 
    //Post,
    Param,
    } from "@nestjs/common";
import { UserModel } from "../model/user.model";
import { UserService } from "../providers/user.service";

@Controller('v1/users')
export class UserController {

    constructor(
        private userService: UserService
        ){ }

    @Get()
    async findAll() : Promise<UserModel[]>{
        return this.userService.findAll();
    }
    @Get(':document')
    async findOne(@Param('document') document: number) : Promise<UserModel>{
        return this.userService.findOne(document);
    }
    //@Post()
    //create() {
       //return;
    //}

    //  @Put(':document')
    //update(@Param('document') document: number) {
        //return this.userService.update(+document);
    //}

    @Delete(':document')
    async  delete(@Param('document') document: number) {
        this.userService.delete(document);
        console.log("User " + document + " removido")
    }
}