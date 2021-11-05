import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { Users } from '../users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) { }

    findAll() {
        console.log(this.usersRepository.find());
        return this.usersRepository.find();

    }
    findOne(id: number): Promise<Users> {
        return this.usersRepository.findOne(id);
    }
    createDto(createUserDto: CreateUsersDto){
        return this.usersRepository.insert(createUserDto);
    }
    updateDto(@Param('id') id: number,  updateUserDto: UpdateUsersDto) {
        return this.usersRepository.update(id, updateUserDto);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
