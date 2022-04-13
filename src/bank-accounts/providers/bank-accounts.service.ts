import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dtos/update-bank-account.dto';
import { BankAccount } from '../entities/bank-account.entity';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>
  ){}

  async findAll() {
    return await this.bankAccountRepository.find();
  }

  async findOne(id: number) {
    return await this.bankAccountRepository.findOne(id);
  }

  async create(createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountRepository.save(createBankAccountDto);
  }

  async update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return await this.update(id, updateBankAccountDto) 
  }

  async remove(id: number) {
    return await this.bankAccountRepository.delete(id);
  }
}
