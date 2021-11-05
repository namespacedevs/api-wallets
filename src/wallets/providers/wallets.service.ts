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
    create(createWalletsDto: CreateWalletDto) {
        return this.walletsRepository.insert(createWalletsDto);
    }
    update(@Param('id') id: number, updateWalletDto: UpdateWalletDto) {
        return this.walletsRepository.update(id, updateWalletDto);
    }

    async delete(id: number): Promise<void> {
        await this.walletsRepository.delete(id);
    }
}
