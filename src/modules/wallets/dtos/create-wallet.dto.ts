import { User } from "src/modules/users/entities/users.entity";

export class CreateWalletDto {
    constructor(
      public name: string,
      public userId: User,
    ){}
  }
  