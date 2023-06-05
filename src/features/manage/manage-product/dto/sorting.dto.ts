import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class SortingDto {
  @ApiProperty({
    description: 'tag_id清單',
  })
  @IsMongoId({
    each: true,
    message: () => {
      throw new BadRequestException('必須傳入MongoID格式的字串');
    },
  })
  public readonly list: string[];
}
