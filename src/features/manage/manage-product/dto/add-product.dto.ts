import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsIn,
  IsUrl,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';

export class AddProductDto {
  @ApiProperty({ description: '商品名稱', required: true, type: String })
  @IsString({
    message: () => {
      throw new BadRequestException('product_name 需為字串');
    },
  })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('product_name 不可為空');
    },
  })
  product_name: string;

  @ApiProperty({
    description: '商品類型',
    required: true,
    default: 0,
    type: Number,
  })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('product_type 不可為空');
    },
  })
  @IsIn([0, 1], {
    message: () => {
      throw new BadRequestException('product_type 必須為 0 或 1');
    },
  })
  // 0-單一商品 1-套餐商品
  // 原本是拿來做是否要輸入子商品的判斷，但以目前的進度，還是先當作後續擴充的準備
  product_type: number;

  @ApiProperty({
    description: '商品類別',
    type: String,
  })
  @IsString({
    message: () => {
      throw new BadRequestException('product_tags 需為字串');
    },
  })
  product_tags: string;

  @ApiProperty({
    description: '商品照片',
  })
  @IsOptional()
  @IsUrl(
    {
      protocols: ['https'],
      require_protocol: true,
    },
    {
      message: () => {
        throw new BadRequestException(
          'product_image 需為URL格式，並帶有https協議',
        );
      },
    },
  )
  product_image: string;

  @ApiProperty({
    description: '商品價格',
    type: Number,
  })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('product_price 不可為空');
    },
  })
  @IsInt({
    message: () => {
      throw new BadRequestException('product_price 需為整數');
    },
  })
  @IsPositive({
    message: () => {
      throw new BadRequestException('product_price 需為正數');
    },
  })
  product_price: number;

  @ApiProperty({ description: '商品註記', required: true, type: [Object] })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('product_note 不可為空');
    },
  })
  // 在 middleware 裡做檢查
  product_note: ProductNote[];

  @ApiProperty({ description: '食材消耗', required: true, type: [Object] })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('FoodConsumption 不可為空');
    },
  })
  // 在 middleware 裡做檢查
  food_consumption_list: FoodConsumption[];
}

interface ProductNote {
  note_title: string;
  use_money: number;
  is_food_consumption: boolean;
  food_consumption_list?: FoodConsumption[];
}

interface FoodConsumption {
  id: string;
  consumption_quantity: number;
}
