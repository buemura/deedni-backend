import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreateJobApplicationDto } from '@modules/jobs/dtos/create-job-application.dto';
import { JobsApplicationsRepository } from '@modules/jobs/repositories/jobs-applications.repository';
import { JobsRepository } from '@modules/jobs/repositories/jobs.repository';
import { UsersService } from '@modules/users/services/users.service';

@Injectable()
export class JobsApplicationsService {
  private readonly logger: Logger;

  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly jobsApplicationsRepository: JobsApplicationsRepository,
    private readonly usersService: UsersService,
  ) {
    this.logger = new Logger(JobsApplicationsService.name);
  }

  async create(jobId: number, data: CreateJobApplicationDto) {
    this.logger.log(`Checkgin job ${jobId} and user ${data.userId}`);
    const [jobExists, userExists] = await Promise.all([
      this.jobsRepository.findById(jobId),
      this.usersService.findById(data.userId),
    ]);

    if (!jobExists) {
      this.logger.log(`Job ${jobId} not found`);
      throw new NotFoundException('Job not found');
    }

    if (!userExists) {
      this.logger.log(`User ${data.userId} not found`);
      throw new NotFoundException('User not found');
    }

    this.logger.log('Creating job application');
    return this.jobsApplicationsRepository.create({
      userId: data.userId,
      jobId,
    });
  }
}
