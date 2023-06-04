import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDetailDto {
  @IsNotEmpty()
  @IsString()
  public readonly product_id: string;

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
}
