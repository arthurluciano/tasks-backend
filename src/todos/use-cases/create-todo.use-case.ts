import { Injectable } from '@nestjs/common'

import { CreateTodoDto } from '../domain/create-todo.dto'
import { TodosRepository } from '../infra/todos.repository'

@Injectable()
export class CreateTodoUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(data: CreateTodoDto, userId: string) {
    const todo = await this.todosRepository.create({ title: data.title, user: { connect: { id: userId } } })

    return todo
  }
}
