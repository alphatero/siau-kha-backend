import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductTagStatus } from 'src/core/models/product-tags';

export class ChangeTagStatusDto {
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
