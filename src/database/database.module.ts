import { Module } from '@nestjs/common';
import { CompaniesRepository } from 'src/repositories/companies.repository';
import { JobsRepository } from 'src/repositories/jobs.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCompaniesRepository } from './prisma/repositories/companies.repository';
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
  ],
  exports: [UsersRepository, CompaniesRepository, JobsRepository],
})
export class DatabaseModule {}
