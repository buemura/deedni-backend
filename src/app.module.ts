import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@modules/auth/auth.module';
import { CompaniesModule } from '@modules/companies/companies.module';
import { JobsModule } from '@modules/jobs/jobs.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    JobsModule,
  ],
})
export class AppModule {}
