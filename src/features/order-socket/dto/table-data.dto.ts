import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDetailDto } from './product-detail.dto';

export class TableDataDto {
  @IsNotEmpty()
  @IsString()
  table_id: string;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  product_detail: ProductDetailDto[];
}
