import { Injectable } from "@nestjs/common";
import { ValidatorInterface } from "../../shared/interfaces/validator.interface";
import { Flunt } from "../../utils/flunt";
import { Wallet } from "../entities/wallets.entity";


@Injectable()
export class CreateWalletInterface implements ValidatorInterface{
    errors: any[];

    validate(model: Wallet): any {
        const flunt = new Flunt();

        flunt.isRequired(model.name, 'O nome da carteira é obrigatório.');

        this.errors = flunt.errors;
        
        return flunt.isValid();
    }
}