import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}
