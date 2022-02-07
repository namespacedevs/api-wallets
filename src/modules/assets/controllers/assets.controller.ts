import { Controller, Delete, Get, Put, Post, Param, Body, HttpException, HttpStatus } from "@nestjs/common";
import { CreateAssetDto } from "../dtos/create-asset.dto";
import { UpdateAssetDto } from "../dtos/update-asset.dto";
import { AssetsService } from "../providers/assets.service";
import { Result } from "src/shared/dtos/result.dto";

@Controller('v1/assets')
export class AssetsController {

    constructor(
        private assetsService: AssetsService
    ) { }

    @Get()
    async findAll() {
        try{
            const assets = await this.assetsService.findAll();
            return new Result('Lista dos ativos.', true, assets, null);
        }
        catch(error){
            throw new HttpException(new Result(
                'Não foi possivel listar os ativos.',
                false,
                null,
                error),
                HttpStatus.BAD_REQUEST
            );
        }
    }
    
    @Get(':id')
    async findOne(@Param('id') id: number) { 
        try{
            const asset = await this.assetsService.findOne(id);
            return new Result('Ativo solicitado.', true, asset, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel listar o ativo.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body() create: CreateAssetDto) { 
        try{
            const createAsset = await this.assetsService.create(create);
            return new Result('Ativo criado com sucesso.', true, createAsset, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel criar o ativo.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() update: UpdateAssetDto) {
        try{
            const updateAsset = await this.assetsService.update(id, update);
            return new Result('Ativo alterado com sucesso.', true, updateAsset, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel alterar o ativo.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) { 
        try{
            await this.assetsService.delete(id);
            return new Result('Ativo deletado com sucesso', true, null, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possivel deletar o ativo.', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
