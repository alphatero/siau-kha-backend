import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
//import { TableStatus } from 'src/core/models/table-main';

export class CreateActivityDto {
  @ApiProperty({ description: '活動名稱', required: true })
  @IsNotEmpty()
  public readonly activities_name: string;

  @ApiProperty({ description: '計算類別' })
  @IsNotEmpty()
  @IsIn(['0', '1'], { message: 'discount_type 必須為 0 或 1' })
  // 0-全單優惠 1-指定商品
  public readonly discount_type: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: 0,
    description: '最低消費金額',
  })
  public readonly min_spend: number;

  @ApiProperty({ description: '計算類型' })
  @IsNotEmpty()
  @IsIn(['0', '1'], { message: 'charge_type 必須為 0 或 1' })
  // 0-折扣 1-折讓
  public readonly charge_type: string;

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
  @IsNotEmpty()
  @IsDateString()
  public readonly start_time: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: '活動結束時間',
  })
  @ValidateIf((dto) => dto.is_period)
  @IsNotEmpty()
  @IsDateString()
  public readonly end_time: Date;

  @ApiProperty({
    description: '指定商品',
  })
  @IsArray()
  // @ValidateNested({ each: true }) // 讓套件知道要驗證每個元素
  // @Type(() => String) // 每個元素都是字串
  @IsMongoId({ each: true })
  public act_products_list: string[];

  @ApiProperty({
    required: false,
    type: Boolean,
    default: true,
    description: '活動狀態',
  })
  @IsOptional()
  @IsBoolean()
  public readonly status?: boolean;

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
    description: '是否刪除',
  })
  @IsOptional()
  @IsBoolean()
  public readonly is_delete?: boolean;
}
