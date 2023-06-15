import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  profileUrl: string;
}
