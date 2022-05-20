import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Result } from '../../shared/dtos/result.dto';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dtos/update-bank-account.dto';
import { BankAccountsService } from '../services/bank-accounts.service';

@Controller('v1/bank-accounts')
@UseGuards(JwtAuthGuard)
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
  async create(@Request() req, @Body() createBrakAccountDto: CreateBankAccountDto) {
    try{
      createBrakAccountDto.userId = req.user.id
      const newWallet = await this.bankAccountsService.create(createBrakAccountDto);
      return new Result('Carteria criada com sucesso.', true, newWallet, null);
    }
    catch(error){
      throw new HttpException(new Result('Não foi possivel criar a carteira.', false, null, error), HttpStatus.BAD_REQUEST);
    }
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
