
import { Body, Controller, Get, Param, Post, Put, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletDto } from '../dtos/update-wallet.dto';
import { WalletsService } from '../providers/wallets.service';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateWalletContract } from '../contracts/create-wallet.contract';
import { Result } from 'src/shared/dtos/result.dto';

@Controller('v1/wallets')
export class WalletsController {

  constructor(
    private walletsService: WalletsService
  ) { }

  @Get()
  async findAll() {
    
    try{
      const wallets = await this.walletsService.findAll();
      return new Result('Lista das carteiras.', true, wallets, null);
    }
    catch(error){
      throw new HttpException(new Result( 'Não foi possivel listar as carteiras.', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number) { 
    try{
      const wallet = await this.walletsService.findOne(id);
      return new Result('Carteira solicitada.', true, wallet, null);
    }
    catch(error){
      throw new HttpException(new Result('Não foi possivel listar a carteira.', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateWalletContract))
  async create(@Body() model: CreateWalletDto) {
    try{
      const newWallet = await this.walletsService.create(model);
      return new Result('Carteria criada com sucesso.', true, newWallet, null);
    }
    catch(error){
      throw new HttpException(new Result('Não foi possivel criar a carteira.', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() update: UpdateWalletDto) { 
    try{
      const updateWallet = await this.walletsService.update(id, update);
      return new Result('Carteira alterada com sucesso.', true, updateWallet, null);
    }
    catch(error){
      throw new HttpException(new Result('Não foi possivel alterar a carteira.', false, null, error), HttpStatus.BAD_REQUEST); 
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try{
      await this.walletsService.delete(id);
      return new Result('Carteira deletada com sucesso.', true, null, null);
    }
    catch(error){
      throw new HttpException(new Result('Não foi possivel deletar a carteira.', false, null, error), HttpStatus.BAD_REQUEST); 
    }
  }
}
