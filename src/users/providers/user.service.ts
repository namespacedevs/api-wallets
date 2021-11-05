import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../users.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    findAll() {
        console.log(this.userRepository.find());
        return this.userRepository.find();

    }
    findOne(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }
    createDto(createUserDto: CreateUserDto){
        return this.userRepository.insert(createUserDto);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
