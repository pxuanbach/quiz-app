import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    minLength: 7,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(7)
  username: string;
}

export default ForgotPasswordDto;
