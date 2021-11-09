import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletDto } from '../dtos/update-wallet.dto';
import { Wallet } from '../wallets.entity';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletsRepository: Repository<Wallet>
    ) { }

    async findAll() {
        return await this.walletsRepository.find();
    }

    findOne(id: number): Promise<Wallet> {
        return this.walletsRepository.findOne(id);
    }
    create(create: CreateWalletDto) {
        return this.walletsRepository.create(create);
    }
    update(@Param('id') id: number, update: UpdateWalletDto) {
        return this.walletsRepository.update(id, update);
    }

    async delete(id: number): Promise<void> {
        await this.walletsRepository.delete(id);
    }
}
