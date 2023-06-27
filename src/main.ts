import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionsFilter } from '@infra/filters/all-exceptions.filter';
import { LoggerInterceptor } from '@infra/interceptors/logger.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('deedni API')
    .setDescription('The deedni API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port);

  const logger = new Logger('App');
  logger.log(`Backend running...`);
  logger.log(`environment: ${process.env.NODE_ENV.toUpperCase()}`);
  logger.log(`host: ${await app.getUrl()}`);
}

bootstrap();
