import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
