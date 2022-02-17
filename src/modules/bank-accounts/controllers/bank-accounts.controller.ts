import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dtos/update-bank-account.dto';
import { BankAccountsService } from '../providers/bank-accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Get()
  findAll() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(+id);
  }
  
  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.create(createBankAccountDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountsService.update(+id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountsService.remove(+id);
  }
}
