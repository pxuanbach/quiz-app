import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import ChangePasswordDto from './changePassword.dto';

export class ResetPasswordDto extends ChangePasswordDto {}

export default ResetPasswordDto;
