import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ProductDetailStatus } from 'src/core/models/product-detail';
import { BadRequestException } from '@nestjs/common';

export class UpdateProductDetailDto {
  @IsNotEmpty()
  @IsString()
  table_id: string;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  detail_id: string;

  @IsNotEmpty()
  @IsString()
  p_id: string;

  @IsEnum(ProductDetailStatus, {
    message: () => {
      throw new BadRequestException(
        `status 僅能為 ${Object.values(ProductDetailStatus)}`,
      );
    },
  })
  @IsNotEmpty()
  status: ProductDetailStatus;
}
