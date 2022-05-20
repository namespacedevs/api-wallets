import { Injectable } from "@nestjs/common";
import { Interface } from "src/shared/interfaces/interface";
import { Flunt } from "../../utils/flunt";
import { User } from "../entities/users.entity";


@Injectable()
export class UpdateUserInterface implements Interface {
    errors: any[];
    validate(entity: User): boolean {
        const flunt = new Flunt();
        
        flunt.hasMinLen(entity.name, 3, 'O nome tem que ter pelo menos 3 letras.');
        
        this.errors = flunt.errors;

        return flunt.isValid();
    }
}