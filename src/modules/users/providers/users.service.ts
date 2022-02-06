import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUserDto } from '../dtos/update-users.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }

    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async create(createUser: CreateUsersDto){
        return await this.usersRepository.save(createUser);
    }

    async update(@Param('id') id: number,  updateUser: UpdateUserDto) {
        return await this.usersRepository.update(id, updateUser);
    }

    async delete(id: number) {
        await this.usersRepository.delete(id);
    }
}
