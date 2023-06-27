import { Injectable } from '@nestjs/common';

import { CreateJobApplicationDto } from '@modules/jobs/dtos/create-job-application.dto';
import { JobsApplicationsQueryOptionsDto } from '@modules/jobs/dtos/job-application-query-options.dto';
import { JobApplication } from '@modules/jobs/entities/job-application.entity';
import { JobsApplicationsRepository } from '@modules/jobs/repositories/jobs-applications.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaJobsApplicationsRepository
  implements JobsApplicationsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    options?: JobsApplicationsQueryOptionsDto,
  ): Promise<JobApplication[]> {
    const query = {} as any;

    if (options.userId) {
      query.userId = options.userId;
    }

    if (options.jobId) {
      query.jobId = Number(options.jobId);
    }

    return this.prisma.jobApplication.findMany({
      where: query,
      include: {
        job: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findById(id: number): Promise<JobApplication> {
    return this.prisma.jobApplication.findFirst({
      where: { id },
    });
  }

  async create(data: CreateJobApplicationDto): Promise<JobApplication> {
    return this.prisma.jobApplication.create({
      data: {
        userId: data.userId,
        jobId: data.jobId,
      },
    });
  }

  async remove(id: number): Promise<JobApplication> {
    return this.prisma.jobApplication.delete({
      where: { id },
    });
  }
}
