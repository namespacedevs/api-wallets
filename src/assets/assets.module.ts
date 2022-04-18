import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssetsController } from "./controllers/assets.controller";
import { Asset } from "./entities/assets.entity";
import { AssetsService } from "./providers/assets.service";


@Module({
    imports: [TypeOrmModule.forFeature([Asset])],
    controllers: [AssetsController],
    providers: [AssetsService]
})
export class AssetsModule {}