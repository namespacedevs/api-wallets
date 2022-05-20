import { Injectable } from "@nestjs/common";
import { ValidatorInterface } from "../../shared/interfaces/validator.interface";
import { Flunt } from "../../utils/flunt";
import { User } from "../entities/users.entity";


@Injectable()
export class CreateUserInterface implements ValidatorInterface {
    errors: any[];
    validate(entity: User): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(entity.name, 3, 'O nome tem que ter pelo menos 3 letras.');
        flunt.isEmail(entity.email, 'Email inválido.');
        flunt.isFixedLen (entity.document, 11, 'O CPF tem que ter 11 números.');
        flunt.hasMinLen(entity.password, 8, 'O nome tem que ter pelo menos 8 caracteres.');
        
        this.errors = flunt.errors;

        return flunt.isValid();
    }
}
