import { CreateJobApplicationDto } from '@dtos/jobs/create-job-application.dto';
import { JobsApplicationsQueryOptionsDto } from '@dtos/jobs/job-application-query-options.dto';
import { JobApplication } from '@entities/job-application.entity';

export abstract class JobsApplicationsRepository {
  abstract findMany(
    options?: JobsApplicationsQueryOptionsDto,
  ): Promise<JobApplication[]>;
  abstract findById(id: number): Promise<JobApplication>;
  abstract create(data: CreateJobApplicationDto): Promise<JobApplication>;
  abstract remove(id: number): Promise<JobApplication>;
}
