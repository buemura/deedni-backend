import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesGuard } from '@modules/auth/guards/company-role.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateJobApplicationDto } from '@modules/jobs/dtos/create-job-application.dto';
import { JobsApplicationsQueryOptionsDto } from '@modules/jobs/dtos/job-application-query-options.dto';
import { JobApplicationResponseDto } from '@modules/jobs/dtos/job-application-response.dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { ROLES } from '@shared/enums/roles';
import { JobsApplicationsService } from '../services/jobs-applications.service';

@Controller('jobs-applications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLES.USER)
@ApiTags('Jobs applications')
@ApiBearerAuth()
export class JobsApplicationsController {
  constructor(
    private readonly jobsApplicationsService: JobsApplicationsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: JobApplicationResponseDto })
  async findMany(@Query() query: JobsApplicationsQueryOptionsDto) {
    return this.jobsApplicationsService.findManyApplications(query);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: JobApplicationResponseDto })
  async create(@Body() data: CreateJobApplicationDto) {
    return this.jobsApplicationsService.create(data);
  }
}
