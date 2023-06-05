import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductTagStatus } from 'src/core/models/product-tags';

export class ChangeTagStatusDto {
  @ApiProperty({ description: '商品類別id', required: true, type: String })
  @IsString({
    message: () => {
      throw new BadRequestException('tag_id 需為字串');
    },
  })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('tag_id 不可為空');
    },
  })
  public readonly tag_id: string;

  @ApiProperty({ required: true })
  @IsEnum(ProductTagStatus, {
    message: () => {
      throw new BadRequestException(
        `action 僅能為 ${Object.values(ProductTagStatus)}`,
      );
    },
  })
  @IsNotEmpty()
  public readonly action: ProductTagStatus;
}
