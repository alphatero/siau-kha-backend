import { ApiProperty } from '@nestjs/swagger';
import { TodoPriority } from '../types/todo.type';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  TODO_DESCRIPTION_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from 'src/core/models/todo';

export class CreateTodoDto {
  @ApiProperty({
    maxLength: 20,
    description: 'Title of todo',
  })
  @MinLength(TODO_TITLE_MIN_LENGTH)
  @MaxLength(TODO_TITLE_MAX_LENGTH)
  public readonly title?: string;

  @ApiProperty({
    required: false,
    maxLength: 100,
    description: 'Description of todo',
  })
  @IsOptional()
  @MaxLength(TODO_DESCRIPTION_MAX_LENGTH)
  public readonly description?: string;

  @ApiProperty({
    required: false,
    description: 'completed of todo',
  })
  @IsOptional()
  @IsBoolean()
  public readonly completed?: boolean;

  @IsNotEmpty()
  public assignee: string;

  // @ApiProperty({
  //   required: false,
  //   type: [String],
  //   description: 'Tags of todo',
  // })
  // public readonly tags?: string[];

  // @ApiProperty({
  //   description: 'Priority of todo',
  //   enum: TodoPriority,
  //   enumName: 'TodoPriority',
  // })
  // public readonly priority: TodoPriority;
}
