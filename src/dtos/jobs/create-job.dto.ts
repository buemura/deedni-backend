import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
