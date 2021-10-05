import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {
    users: UserModel[] = [
        { name: 'Thiago', email: 'thiago@tesla.com', document: 12345678911 },
        { name: 'Uigor', email: 'uigor@marshall.com', document: 12345678912 },
        { name: 'Jeff', email: 'jeff@tequila.com', document: 12345678913 },
        { name: 'Adisson', email: 'adisson@solteiro.com', document: 12345678914 }
    ];

    findAll() {
        return this.users;
    }
    findOne(document: number) {
        const user = this.users.find((user) => user.document == document);
        return user
    }
    create(createUserDto: CreateUserDto) {
        this.users.push(createUserDto);
        return this.users;
    }
    update(document: number, updateUserDto: CreateUserDto) {
        const user = this.findOne(updateUserDto.document);
        console.log(user)
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        user.document = updateUserDto.document;
        this.delete(document);
        this.create(user);
        return this.users;
    }
    delete(document: number) {
        const user = this.findOne(document);
        if (user) {
            this.remove(document);
            return user;
        }
        return 'Usuario não encontrado, por favor passar um documento valido!'
    }

    private remove(document) : void {
        this.users = this.users.filter((user) => user.document != document);
    }
}
