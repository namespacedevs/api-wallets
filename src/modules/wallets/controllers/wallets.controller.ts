
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete
} from '@nestjs/common';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletDto } from '../dtos/update-wallet.dto';
import { WalletsService } from '../providers/wallets.service';
import { Wallet } from '../wallets.entity';

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
  findOne(@Param('id') id: number): Promise<Wallet> {
    return this.walletsService.findOne(id);
  }
  @Post()
  async create(@Body() create: CreateWalletDto) {
    return this.walletsService.create(create);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() update: UpdateWalletDto) {
    return this.walletsService.update(id, update);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.walletsService.delete(id);
  }
}
