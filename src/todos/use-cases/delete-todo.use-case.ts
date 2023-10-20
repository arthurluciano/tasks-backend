import { Injectable, NotFoundException } from '@nestjs/common'

import { TodosRepository } from '../infra/todos.repository'

@Injectable()
export class DeleteTodoUseCase {
  constructor(private todosRepository: TodosRepository) {}

  async execute(taskId: string, userId: string) {
    const todo = await this.todosRepository.findFirst({
      where: {
        id: taskId
      }
    })

    if (!todo) {
      throw new NotFoundException('Esse id de todo não existe')
    }

    const deletedTodo = await this.todosRepository.delete({ where: { id: todo.id, userId } })

    return deletedTodo
  }
}
