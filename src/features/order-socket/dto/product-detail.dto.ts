import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDetailStatus } from 'src/core/models/product-detail';

export class ProductDetailDto {
  @IsNotEmpty()
  @IsString()
  public readonly order_id: string;

  @IsNotEmpty()
  @IsString()
  public readonly product_name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public readonly product_quantity: number;

  @IsArray()
  @Type(() => String)
  public readonly product_note: Array<string>;

  @IsNotEmpty()
  @IsEnum(ProductDetailStatus)
  public readonly status: ProductDetailStatus;

  @IsNotEmpty()
  @IsString()
  public readonly create_time: string;
}
