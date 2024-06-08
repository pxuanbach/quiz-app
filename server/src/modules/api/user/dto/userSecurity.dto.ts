import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

class UserSecurityDto {
  @ApiProperty()
  @IsString()
  @Exclude()
  accessToken?: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  refreshToken?: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  verifyToken?: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  resetPassToken?: string;
}

export default UserSecurityDto;
