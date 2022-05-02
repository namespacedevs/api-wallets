import { User } from "../../users/entities/users.entity";

export class CreateBankAccountDto {
    constructor(
        public bankName: string,
        public userId: User,
    ){}
}
