import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
