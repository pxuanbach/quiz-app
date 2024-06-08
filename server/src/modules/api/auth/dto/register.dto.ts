import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default RegisterDto;
