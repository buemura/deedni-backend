import { IsEmail, IsString } from 'class-validator';

export class LoginCompanyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
