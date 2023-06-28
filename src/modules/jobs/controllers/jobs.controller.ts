import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesGuard } from '@modules/auth/guards/company-role.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateJobDto } from '@modules/jobs/dtos/create-job.dto';
import { JobsQueryOptionsDto } from '@modules/jobs/dtos/job-query-options.dto';
import { JobResponseDto } from '@modules/jobs/dtos/job-response.dto';
import { UpdateJobDto } from '@modules/jobs/dtos/update-job.dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { NotFoundResponseDto } from '@shared/dtos/not-found-response.dto';
import { ROLES } from '@shared/enums/roles';
import { ERROR_MESSAGE } from '../errors/message';
import { JobsService } from '../services/jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOkResponse({ type: [JobResponseDto] })
  async findMany(@Query() query: JobsQueryOptionsDto) {
    return this.jobsService.findMany(query);
  }

  @Get(':jobId')
  @ApiOkResponse({ type: JobResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async findOne(@Param('jobId') jobId: string) {
    const job = await this.jobsService.findById(+jobId);
    if (!job) {
      throw new NotFoundException(ERROR_MESSAGE.JOB_NOT_FOUND);
    }

    return job;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: JobResponseDto })
  async create(@Body() data: CreateJobDto) {
    return this.jobsService.create(data);
  }

  @Patch(':jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  @ApiBearerAuth()
  @ApiOkResponse({ type: JobResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async update(
    @Param('jobId') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    const job = await this.jobsService.update(+jobId, updateJobDto);
    if (!job) {
      throw new NotFoundException(ERROR_MESSAGE.JOB_NOT_FOUND);
    }

    return job;
  }

  @Delete(':jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  @ApiBearerAuth()
  @ApiOkResponse({ type: JobResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async remove(@Param('jobId') jobId: string) {
    const job = await this.jobsService.remove(+jobId);
    if (!job) {
      throw new NotFoundException(ERROR_MESSAGE.JOB_NOT_FOUND);
    }

    return job;
  }
}
