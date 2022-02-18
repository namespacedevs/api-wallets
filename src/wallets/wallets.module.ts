import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsController } from "./controllers/wallets.controller";
import { Wallet } from "./entities/wallets.entity";
import { WalletsService } from "./providers/wallets.service";


@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletsController],
    providers: [WalletsService]
})
export class WalletsModule {}