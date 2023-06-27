import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreateJobApplicationDto } from '@modules/jobs/dtos/create-job-application.dto';
import { JobsApplicationsQueryOptionsDto } from '@modules/jobs/dtos/job-application-query-options.dto';
import { JobApplication } from '@modules/jobs/entities/job-application.entity';
import { JobsApplicationsRepository } from '@modules/jobs/repositories/jobs-applications.repository';
import { UsersService } from '@modules/users/services/users.service';
import { JobsService } from './jobs.service';

@Injectable()
export class JobsApplicationsService {
  private readonly logger: Logger;

  constructor(
    private readonly jobsApplicationsRepository: JobsApplicationsRepository,
    private readonly usersService: UsersService,
    private readonly jobsService: JobsService,
  ) {
    this.logger = new Logger(JobsApplicationsService.name);
  }

  async findManyApplications(
    params: JobsApplicationsQueryOptionsDto,
  ): Promise<JobApplication[]> {
    this.logger.log(`Getting jobs applications`);
    return this.jobsApplicationsRepository.findMany(params);
  }

  async create({
    jobId,
    userId,
  }: CreateJobApplicationDto): Promise<JobApplication> {
    this.logger.log(`Checkgin job ${jobId} and user ${userId}`);
    const [jobExists, userExists] = await Promise.all([
      this.jobsService.findById(jobId),
      this.usersService.findById(userId),
    ]);

    if (!jobExists) {
      this.logger.log(`Job ${jobId} not found`);
      throw new NotFoundException('Job not found');
    }

    if (!userExists) {
      this.logger.log(`User ${userId} not found`);
      throw new NotFoundException('User not found');
    }

    this.logger.log('Creating job application');
    return this.jobsApplicationsRepository.create({
      userId,
      jobId,
    });
  }
}
