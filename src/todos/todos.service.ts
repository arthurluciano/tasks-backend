import { Injectable } from '@nestjs/common'

import { CreateTodoDto } from './domain/create-todo.dto'
import { UpdateTodoDto } from './domain/update-todo.dto'
import { CreateTodoUseCase } from './use-cases/create-todo.use-case'
import { DeleteTodoUseCase } from './use-cases/delete-todo.use-case'
import { ListTodosUseCase } from './use-cases/list-todos.use-case'
import { UpdateTodoStatusUseCase } from './use-cases/update-todo-status.use-case'

@Injectable()
export class TodosService {
  constructor(
    private createTodoUseCase: CreateTodoUseCase,
    private updateTodoStatusUseCase: UpdateTodoStatusUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase,
    private listTodosUseCase: ListTodosUseCase
  ) {}

  async index(userId: string) {
    return await this.listTodosUseCase.execute(userId)
  }

  async create(data: CreateTodoDto, userId: string) {
    return await this.createTodoUseCase.execute(data, userId)
  }

  async updateStatus(data: UpdateTodoDto, userId: string) {
    return await this.updateTodoStatusUseCase.execute(data, userId)
  }

  async delete(taskId: string, userId: string) {
    return await this.deleteTodoUseCase.execute(taskId, userId)
  }
}
