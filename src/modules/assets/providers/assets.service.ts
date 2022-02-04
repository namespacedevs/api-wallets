import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Asset } from "../entities/assets.entity";
import { CreateAssetDto } from "../dtos/create-asset.dto";
import { UpdateAssetDto } from "../dtos/update-asset.dto";


@Injectable()
export class AssetsService {
    constructor(
        @InjectRepository(Asset)
        private assetsRepository: Repository<Asset>
    ) { }

    findAll() {
        return this.assetsRepository.find();
    }
    findOne(id: number): Promise<Asset> {
        return this.assetsRepository.findOne(id);
    }
    create(create: CreateAssetDto){
        return this.assetsRepository.insert(create);
    }
    update(@Param('id') id: number,  update: UpdateAssetDto) {
        return this.assetsRepository.update(id, update);
    }

    async delete(id: number): Promise<void> {
        await this.assetsRepository.delete(id);
    }
}
