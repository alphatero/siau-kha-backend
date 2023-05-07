import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteImageDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public readonly image_name: string;
}
