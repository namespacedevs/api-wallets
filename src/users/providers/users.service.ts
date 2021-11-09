import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { User } from '../users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    findAll() {
        console.log(this.usersRepository.find());
        return this.usersRepository.find();

    }
    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }
    create(create: CreateUsersDto){
        return this.usersRepository.create(create);
    }
    update(@Param('id') id: number,  update: UpdateUsersDto) {
        return this.usersRepository.update(id, update);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
