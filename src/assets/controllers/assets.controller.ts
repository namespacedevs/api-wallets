import {
    Controller,
    Delete,
    Get,
    Put,
    Post,
    Param,
    Body,
} from "@nestjs/common";
import { Asset } from "../assets.entity";
import { CreateAssetDto } from "../dtos/create-asset.dto";
import { UpdateAssetDto } from "../dtos/update-asset.dto";
import { AssetsService } from "../providers/assets.service";

@Controller('v1/assets')
export class AssetsController {

    constructor(
        private assetsService: AssetsService
    ) { }

    @Get()
    findAll(): Promise<Asset[]> {
        return this.assetsService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Asset> {
        return this.assetsService.findOne(id);
    }
    @Post()
    async create(@Body() create: CreateAssetDto) {
        return this.assetsService.create(create);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() update: UpdateAssetDto) {
        return this.assetsService.update(id, update);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.assetsService.delete(id);
    }
}