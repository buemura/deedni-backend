import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@decorators/roles.decorator';
import { CreateJobDto } from '@dtos/jobs/create-job.dto';
import { JobsQueryOptionsDto } from '@dtos/jobs/job-query-options.dto';
import { JobResponseDto } from '@dtos/jobs/job-response.dto';
import { UpdateJobDto } from '@dtos/jobs/update-job.dto';
import { ROLES } from '@enums/roles';
import { RolesGuard } from '@guards/company-role.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { JobsService } from '../services/jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiResponse({ type: [JobResponseDto] })
  async findMany(@Query() query: JobsQueryOptionsDto) {
    return this.jobsService.findMany(query);
  }

  @Get(':jobId')
  @ApiResponse({ type: JobResponseDto })
  async findOne(@Param('jobId') jobId: string) {
    return this.jobsService.findById(+jobId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async create(@Body() data: CreateJobDto) {
    return this.jobsService.create(data);
  }

  @Patch(':jobId')
  @ApiBearerAuth()
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async update(
    @Param('jobId') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobsService.update(+jobId, updateJobDto);
  }

  @Delete(':jobId')
  @ApiBearerAuth()
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async remove(@Param('jobId') jobId: string) {
    return this.jobsService.remove(+jobId);
  }
}
