import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService{
    users: UserModel[] = [
        {name: 'Thiago', email: 'thiago@tesla.com', document: 12345678911 },
        {name: 'Uigor', email: 'uigor@marshall.com', document: 12345678912},
        {name: 'Jeff', email: 'jeff@tequila.com', document: 12345678913},
        {name: 'Adisson', email: 'adisson@solteiro.com', document: 12345678914}
    ];

        findAll(){
            return this.users;
    }
        findOne(document: number){
            const user = this.users.find((value) => value.document == document);
            return user
    }
        //create(user: UserModel){
            
    //}
        //update(user: UserModel){

    //}
        delete(document: number){
            const index = this.users.findIndex((value) => value.document == document)
            this.users.splice(index, document);
    }


}
