import { Injectable } from '@nestjs/common'

import { CreateTodoDto } from './domain/create-todo.dto'
import { DeleteTodoDto } from './domain/delete-todo.dto'
import { UpdateTodoDto } from './domain/update-todo.dto'
import { CreateTodoUseCase } from './use-cases/create-todo.use-case'
import { DeleteTodoStatusUseCase } from './use-cases/delete-todo.use-case'
import { UpdateTodoStatusUseCase } from './use-cases/update-todo-status.use-case'

@Injectable()
export class TodosService {
  constructor(
    private createTodoUseCase: CreateTodoUseCase,
    private updateTodoStatusUseCase: UpdateTodoStatusUseCase,
    private deleteTodoUseCase: DeleteTodoStatusUseCase
  ) {}

  async create(data: CreateTodoDto, userId: string) {
    return await this.createTodoUseCase.execute(data, userId)
  }

  async updateStatus(data: UpdateTodoDto, userId: string) {
    return await this.updateTodoStatusUseCase.execute(data, userId)
  }

  async delete(data: DeleteTodoDto, userId: string) {
    return await this.deleteTodoUseCase.execute(data, userId)
  }
}
