import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Order } from 'src/core/models/order';
import { TableStatus } from 'src/core/models/table-main';

export class CreateTableDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public readonly table_name: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: 0,
  })
  public readonly seat_max: number;

  @ApiProperty({ required: true })
  @IsEnum(TableStatus)
  public readonly status: TableStatus;

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  public readonly is_delete?: boolean;

  @ApiProperty({
    required: false,
    default: null,
  })
  @IsOptional()
  public readonly order?: Order;
}
