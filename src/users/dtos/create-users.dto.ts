export class CreateUsersDto{
    constructor(
        public name: string,
        public email: string,
        public document: string,
        public password: string,
    ){}
}