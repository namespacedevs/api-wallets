import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { UserController } from './backoffice/controllers/user.controller';

@Module({
  imports: [BackofficeModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
