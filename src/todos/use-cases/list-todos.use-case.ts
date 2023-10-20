import { Injectable } from '@nestjs/common'

import { TodosRepository } from '../infra/todos.repository'

@Injectable()
export class ListTodosUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(userId: string) {
    const todos = await this.todosRepository.index({ where: { userId }, orderBy: { createdAt: 'asc' } })

    return todos
  }
}
