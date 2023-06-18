import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductDetailDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  detail_id: string;

  @IsNotEmpty()
  @IsString()
  p_id: string;
}
