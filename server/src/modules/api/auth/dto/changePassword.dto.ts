import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    minLength: 7,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @ApiProperty({
    minLength: 7,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  confirmPassword: string;
}

export default ChangePasswordDto;
