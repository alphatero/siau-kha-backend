// src/dtos/create-order.dto.ts
import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  ArrayMinSize,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDetailInOrderDetail {
  @ApiProperty({
    type: String,
    description: '商品 id',
  })
  @IsNotEmpty()
  @IsString()
  readonly product_id: string;

  @ApiProperty({ description: '商品數量', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, {
    message: () => {
      throw new BadRequestException('product_quantity 不得小於 1');
    },
  })
  readonly product_quantity: number;

  @ApiProperty({ type: [String], description: '商品註記', example: ['去冰'] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
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
}
