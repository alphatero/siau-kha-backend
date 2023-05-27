import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTagDto {
  @ApiProperty({ description: '標籤名稱', required: true, type: String })
  @IsString({
    message: () => {
      throw new BadRequestException('tag_name 需為字串');
    },
  })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('tag_name 不可為空');
    },
  })
  public readonly tag_name: string;
}
