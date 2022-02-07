import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletDto } from '../dtos/update-wallet.dto';
import { Wallet } from '../entities/wallets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletsRepository: Repository<Wallet>
    ) { }

    async findAll() {
        return await this.walletsRepository.find();
    }

    async findOne(id: number): Promise<Wallet> {
        return await this.walletsRepository.findOne(id);
    }
    async create(model: CreateWalletDto) {
        return await this.walletsRepository.save(model);
    }
   async update(@Param('id') id: number, update: UpdateWalletDto) {
        return await this.walletsRepository.update(id, update);
    }

    async delete(id: number) {
        return await this.walletsRepository.delete(id);
    }
}
