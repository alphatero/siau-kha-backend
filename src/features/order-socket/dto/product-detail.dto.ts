import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
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

  @IsNotEmpty()
  @IsString()
  public readonly product_note: string;

  @IsNotEmpty()
  @IsEnum(ProductDetailStatus, { each: true })
  public readonly status: ProductDetailStatus;

  @IsNotEmpty()
  // @IsDateString()
  public readonly create_time: string;
}
