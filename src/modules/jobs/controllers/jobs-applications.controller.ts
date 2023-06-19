import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@decorators/roles.decorator';
import { CreateJobApplicationDto } from '@dtos/jobs/create-job-application.dto';
import { JobsApplicationsQueryOptionsDto } from '@dtos/jobs/job-application-query-options.dto';
import { JobApplicationResponseDto } from '@dtos/jobs/job-application-response.dto';
import { ROLES } from '@enums/roles';
import { RolesGuard } from '@guards/company-role.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JobsApplicationsService } from '../services/jobs-applications.service';

@ApiTags('jobs-applications')
@Controller('jobs-applications')
export class JobsApplicationsController {
  constructor(
    private readonly jobsApplicationsService: JobsApplicationsService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: JobApplicationResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.USER)
  async findMany(@Query() query: JobsApplicationsQueryOptionsDto) {
    return this.jobsApplicationsService.findManyApplications(query);
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ type: JobApplicationResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.USER)
  async create(@Body() data: CreateJobApplicationDto) {
    return this.jobsApplicationsService.create(data);
  }
}
