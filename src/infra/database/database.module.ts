import { Module } from '@nestjs/common';

import { CompaniesRepository } from '@modules/companies/repositories/companies.repository';
import { JobsApplicationsRepository } from '@modules/jobs/repositories/jobs-applications.repository';
import { JobsRepository } from '@modules/jobs/repositories/jobs.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
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
