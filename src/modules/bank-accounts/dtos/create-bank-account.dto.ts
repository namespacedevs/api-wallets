import { User } from "src/modules/users/entities/users.entity";

export class CreateBankAccountDto {
    constructor(
        public bankName: string,
        public userId: User,
    ){}
}
