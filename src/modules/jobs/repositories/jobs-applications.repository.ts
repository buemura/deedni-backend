import { CreateJobApplicationDto } from '@modules/jobs/dtos/create-job-application.dto';
import { JobsApplicationsQueryOptionsDto } from '@modules/jobs/dtos/job-application-query-options.dto';
import { JobApplication } from '@modules/jobs/entities/job-application.entity';

export abstract class JobsApplicationsRepository {
  abstract findMany(
    options?: JobsApplicationsQueryOptionsDto,
  ): Promise<JobApplication[]>;
  abstract findById(id: number): Promise<JobApplication>;
  abstract create(data: CreateJobApplicationDto): Promise<JobApplication>;
  abstract remove(id: number): Promise<JobApplication>;
}
