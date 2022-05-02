import { Injectable } from "@nestjs/common";
import { Flunt } from "../../utils/flunt";
import { User } from "../entities/users.entity";
import { Contract } from "../../shared/contracts/contract";

@Injectable()
export class UpdateUserContract implements Contract {
    errors: any[];
    validate(entity: User): boolean {
        const flunt = new Flunt();
        
        flunt.hasMinLen(entity.name, 3, 'O nome tem que ter pelo menos 3 letras.');
        
        this.errors = flunt.errors;

        return flunt.isValid();
    }
}