import { Injectable } from "@nestjs/common";
import { Flunt } from "src/utils/flunt";
import { User } from "../entities/users.entity";

import { Contract } from "./contract";

@Injectable()
export class UserContract implements Contract {
    erros: any[];
    validate(entity: User): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(entity.name, 3, 'O nome tem que ter pelo menos 3 letras.');
        flunt.isEmail(entity.email, 'Email inválido.');
        flunt.isFixedLen (entity.document, 11, 'O CPF tem que ter 11 números.');
        this.erros = flunt.errors;
        return flunt.isValid();
    }

}