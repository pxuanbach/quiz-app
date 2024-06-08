import { IsEmail, IsObject, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import UserSettingDto from './userSetting.dto';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  // @ApiPropertyOptional({ type: UserSettingDto })
  // @IsObject()
  // setting?: UserSettingDto;
}

export default UpdateUserDto;
