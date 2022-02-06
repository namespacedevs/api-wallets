
import { Body, Controller, Get, Param, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletDto } from '../dtos/update-wallet.dto';
import { WalletsService } from '../providers/wallets.service';
import { Wallet } from '../entities/wallets.entity';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateWalletContract } from '../contracts/create-wallet.contract';

@Controller('v1/wallets')
export class WalletsController {

  constructor(
    private walletsService: WalletsService
  ) { }

  @Get()
  async findAll(): Promise<Wallet[]> {
    return await this.walletsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wallet> {
    return await this.walletsService.findOne(id);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateWalletContract))
  async create(@Body() model: CreateWalletDto) {
    return await this.walletsService.create(model);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() update: UpdateWalletDto) {
    return await this.walletsService.update(id, update);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.walletsService.delete(id);
  }
}
