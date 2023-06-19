import { Module } from '@nestjs/common';

import { CompaniesRepository } from '@repositories/companies.repository';
import { JobsApplicationsRepository } from '@repositories/jobs-applications.repository';
import { JobsRepository } from '@repositories/jobs.repository';
import { UsersRepository } from '@repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCompaniesRepository } from './prisma/repositories/companies.repository';
import { PrismaJobsApplicationsRepository } from './prisma/repositories/jobs-applications.repositories';
import { PrismaJobsRepository } from './prisma/repositories/jobs.repositories';
import { PrismaUsersRepository } from './prisma/repositories/users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
    {
      provide: JobsRepository,
      useClass: PrismaJobsRepository,
    },
    {
      provide: JobsApplicationsRepository,
      useClass: PrismaJobsApplicationsRepository,
    },
  ],
  exports: [
    UsersRepository,
    CompaniesRepository,
    JobsRepository,
    JobsApplicationsRepository,
  ],
})
export class DatabaseModule {}
