import { Injectable, NotFoundException } from '@nestjs/common'

import { UpdateTodoDto } from '../domain/update-todo.dto'
import { TodosRepository } from '../infra/todos.repository'

@Injectable()
export class UpdateTodoStatusUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(data: UpdateTodoDto, userId: string) {
    const todo = await this.todosRepository.findFirst({
      where: {
        id: data.id
      }
    })

    if (!todo) {
      throw new NotFoundException('Esse id de todo não existe')
    }

    const updatedTodo = await this.todosRepository.update({
      data: { checked: data.checked },
      where: {
        id: data.id,
        userId
      }
    })

    return updatedTodo
  }
}
