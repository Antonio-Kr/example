import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  role: number;
}
