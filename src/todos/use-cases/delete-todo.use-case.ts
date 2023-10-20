import { Injectable, NotFoundException } from '@nestjs/common'

import { DeleteTodoDto } from '../domain/delete-todo.dto'
import { TodosRepository } from '../infra/todos.repository'

@Injectable()
export class DeleteTodoStatusUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(data: DeleteTodoDto, userId: string) {
    const todo = await this.todosRepository.findFirst({
      where: {
        id: data.id
      }
    })

    if (!todo) {
      throw new NotFoundException('Esse id de todo não existe')
    }

    const deletedTodo = await this.todosRepository.delete({ where: { id: todo.id, userId } })

    return deletedTodo
  }
}
