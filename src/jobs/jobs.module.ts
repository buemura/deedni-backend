import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService, JwtService],
})
export class JobsModule {}
