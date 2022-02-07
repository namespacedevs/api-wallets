import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsController } from "./controllers/assets.controller";
import { AssetsService } from './providers/assets.service';
import { Asset } from './entities/assets.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Asset])],
    controllers: [AssetsController],
    providers: [AssetsService]
})
export class AssetsModule {}