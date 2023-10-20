import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { UseUser } from 'src/users/infra/decorators/use-user.decorator'
import { UserGuard } from 'src/users/infra/guards/user.guard'

import { CreateTodoDto } from './domain/create-todo.dto'
import { DeleteTodoDto } from './domain/delete-todo.dto'
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
  async delete(@Body() data: DeleteTodoDto, @UseUser() user: User) {
    return await this.todosService.delete(data, user.id)
  }
}
