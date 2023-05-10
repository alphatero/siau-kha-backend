// src/dtos/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDetailInOrderDetail {
  @ApiProperty({ description: '商品 id' })
  @IsNotEmpty()
  @IsString()
  readonly product_id: string;

  @ApiProperty({ description: '商品數量' })
  @IsNotEmpty()
  @IsNumber()
  readonly product_quantity: number;

  @ApiProperty({ type: [String], description: '商品註記', example: ['去冰'] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly product_note: string[];
}

export class CreateOrderDetailDto {
  @ApiProperty({ type: [ProductDetailInOrderDetail], description: '商品詳情' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailInOrderDetail)
  readonly product_detail: ProductDetailInOrderDetail[];

  @ApiProperty({ description: '活動 id' })
  @IsNotEmpty()
  @IsString()
  readonly activitie_id: string;
}
