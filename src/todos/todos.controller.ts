import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { UseUser } from 'src/users/infra/decorators/use-user.decorator'
import { UserGuard } from 'src/users/infra/guards/user.guard'

import { CreateTodoDto } from './domain/create-todo.dto'
import { UpdateTodoDto } from './domain/update-todo.dto'
import { TodosService } from './todos.service'

@Controller('/todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('/')
  @UseGuards(UserGuard)
  async create(@Body() data: CreateTodoDto, @UseUser() user: User) {
    return await this.todosService.create(data, user.id)
  }

  @Put('/')
  @UseGuards(UserGuard)
  async updateStatus(@Body() data: UpdateTodoDto, @UseUser() user: User) {
    return await this.todosService.updateStatus(data, user.id)
  }

  @Delete('/')
  @UseGuards(UserGuard)
  async delete(@Query('id') taskId: string, @UseUser() user: User) {
    return await this.todosService.delete(taskId, user.id)
  }

  @Get('/')
  @UseGuards(UserGuard)
  async list(@UseUser() user: User) {
    return await this.todosService.index(user.id)
  }
}
