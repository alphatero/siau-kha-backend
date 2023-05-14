import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TableStatus } from 'src/core/models/table-main';

export class UpdateTableDto {
  @ApiProperty({ required: true, default: TableStatus.IDLE })
  @IsEnum(TableStatus, {
    message: () => {
      throw new BadRequestException(
        `status 僅能為 ${Object.values(TableStatus)}`,
      );
    },
  })
  @IsNotEmpty()
  public readonly status: TableStatus;

  @ApiProperty({
    required: true,
    type: Number,
    default: 0,
  })
  @IsNotEmpty()
  public readonly customer_num: number;
}
