import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './assets.entity';
import { AssetsController } from './controllers/assets.controller';
import { AssetsService } from './providers/assets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Asset])],
    controllers: [AssetsController],
    providers: [AssetsService]
})
export class AssetsModule {}