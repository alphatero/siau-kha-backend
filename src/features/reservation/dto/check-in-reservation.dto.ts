import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ description: '顧客姓名', required: true })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('name 不可為空');
    },
  })
  public readonly name: string;

  @ApiProperty({ description: '手機號碼', required: true })
  @IsPhoneNumber('TW', {
    message: () => {
      throw new BadRequestException('phone 需為台灣手機號碼格式');
    },
  })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('phone 不可為空');
    },
  })
  public readonly phone: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: 1,
    description: '用餐人數',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt({
    message: () => {
      throw new BadRequestException('customer_num 需為整數');
    },
  })
  @Min(1, {
    message: () => {
      throw new BadRequestException('customer_num 必填，且需輸入大於0的數字');
    },
  })
  public readonly customer_num: number;
}
