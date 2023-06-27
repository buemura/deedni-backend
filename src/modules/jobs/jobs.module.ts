import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DatabaseModule } from '@infra/database/database.module';
import { UsersModule } from '@modules/users/users.module';
import { JobsApplicationsController } from './controllers/jobs-applications.controller';
import { JobsController } from './controllers/jobs.controller';
import { JobsApplicationsService } from './services/jobs-applications.service';
import { JobsService } from './services/jobs.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [JobsController, JobsApplicationsController],
  providers: [JobsService, JobsApplicationsService, JwtService],
})
export class JobsModule {}
