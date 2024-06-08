import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

class UserSettingDto {
  @ApiProperty()
  @IsNumber()
  noOfPracticeWord?: number;

  @ApiProperty({ description: 'practice from the all words in collection' })
  @IsBoolean()
  practiceFromAll?: boolean;

  @ApiProperty({
    description: 'practice from the last 100 words in collection',
  })
  @IsNumber()
  practiceFromLast?: number;
}

export default UserSettingDto;
