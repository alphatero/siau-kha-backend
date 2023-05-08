import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductTagDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly tag_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  public readonly sort_no: number;
}
