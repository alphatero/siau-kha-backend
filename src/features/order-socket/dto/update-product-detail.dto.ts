import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDetailDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  detail_id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  p_id: string;
}
