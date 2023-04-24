import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/core/models/todo';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: Todo.name,
    //     schema: TodoSchema,
    //   },
    // ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
