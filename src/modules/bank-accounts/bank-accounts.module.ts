import { Module } from '@nestjs/common';
import { BankAccountsService } from './providers/bank-accounts.service';
import { BankAccountsController } from './controllers/bank-accounts.controller';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService]
})
export class BankAccountsModule {}
