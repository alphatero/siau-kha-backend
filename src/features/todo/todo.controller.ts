import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todo')
@UseGuards(JwtGuard, RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Query('skip') skip: number, @Query('limit') limit: number) {
    const document = await this.todoService.getTodos(skip, limit);
    const todos = document.map((doc) => doc.toJSON());
    return todos;
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    const todo = await this.todoService.getTodoById(id);
    return todo ? todo.toJSON() : {};
  }

  @ApiHeader({
    name: '檔案上傳',
    description: '上傳檔案',
  })
  @ApiCreatedResponse({ description: 'Todo created' })
  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    const todo = await this.todoService.createTodo(dto);
    return todo.toJSON();
  }

  @Patch('id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todoService.updateTodo(id, dto);
    return todo.toJSON();
  }

  @Delete(':id')
  async deleteTodoById(id: string) {
    const todo = await this.todoService.deleteTodo(id);
    return todo.toJSON();
  }
}
