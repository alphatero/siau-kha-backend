import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({ description: '活動名稱', required: true })
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('activities_name 不可為空');
    },
  })
  public readonly activities_name: string;

  @ApiProperty({ description: '計算類別' })
  @IsNotEmpty()
  @IsIn(['0', '1'], {
    message: () => {
      throw new BadRequestException("discount_type必須為 '0' 或 '1'");
    },
  })
  // 0-全單優惠 1-指定商品
  public readonly discount_type: string;

  @ApiProperty({ description: '計算類型' })
  @IsNotEmpty()
  @IsIn(['0', '1'], {
    message: () => {
      throw new BadRequestException("charge_type 必須為 '0' 或 '1'");
    },
  })
  // 0-折扣 1-折讓
  public readonly charge_type: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: 0,
    description: '最低消費金額',
  })
  @IsNotEmpty()
  @IsInt({
    message: () => {
      throw new BadRequestException('min_spend 需為 正整數');
    },
  })
  @Min(0, {
    message: () => {
      throw new BadRequestException('min_spend 不得為負數');
    },
  })
  public readonly min_spend: number;

  @ApiProperty({ required: true, type: Number, description: '折扣/折讓' })
  @IsNotEmpty()
  @IsInt({
    message: () => {
      throw new BadRequestException('discount 需為 正整數');
    },
  })
  public readonly discount: number;

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
    description: '是否為期間限定',
  })
  @IsOptional()
  @IsBoolean()
  public readonly is_period?: boolean;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: '活動開始時間',
  })
  @ValidateIf((dto) => dto.is_period)
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('此活動為期間限定，start_time 不可為空');
    },
  })
  @IsDateString(
    { strict: true },
    {
      message: () => {
        throw new BadRequestException(
          'start_time 格式有誤，請依照 YYYY-MM-DD HH:mm:ss 格式輸入',
        );
      },
    },
  )
  public readonly start_time: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: '活動結束時間',
  })
  @ValidateIf((dto) => dto.is_period)
  @IsNotEmpty({
    message: () => {
      throw new BadRequestException('此活動為期間限定，end_time 不可為空');
    },
  })
  @IsDateString(
    { strict: true },
    {
      message: () => {
        throw new BadRequestException(
          'end_time 格式有誤，請依照 YYYY-MM-DD HH:mm:ss 格式輸入',
        );
      },
    },
  )
  public readonly end_time: Date;

  @ApiProperty({
    description: '指定商品',
  })
  @IsMongoId({
    each: true,
    message: () => {
      throw new BadRequestException('指定商品必須傳入MongoID格式的字串');
    },
  })
  public act_products_list: string[];

  @ApiProperty({
    required: false,
    type: Boolean,
    default: true,
    description: '活動狀態',
  })
  @IsOptional()
  @IsBoolean({
    message: () => {
      throw new BadRequestException('status 需為 true 或 false');
    },
  })
  public readonly status?: boolean;

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
    description: '是否刪除',
  })
  @IsOptional()
  @IsBoolean({
    message: () => {
      throw new BadRequestException('is_delete 需為 true 或 false');
    },
  })
  public readonly is_delete?: boolean;
}
