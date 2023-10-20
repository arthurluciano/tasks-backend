import { faker } from '@faker-js/faker'
import { Todo, User } from '@prisma/client'
import { mock } from 'ts-mockito'

import { TodosRepository } from '../infra/todos.repository'
import { DeleteTodoUseCase } from '../use-cases/delete-todo.use-case'

describe('/todos', () => {
  describe('update todo status use-case', () => {
    let todosRepository: TodosRepository

    let deleteTodoStatusUseCase: DeleteTodoUseCase

    let user: User
    let todo: Todo

    beforeEach(() => {
      todosRepository = mock(TodosRepository)

      deleteTodoStatusUseCase = new DeleteTodoUseCase(todosRepository)

      user = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: faker.internet.password()
      }

      todo = {
        id: faker.string.uuid(),
        title: faker.string.alphanumeric(),
        checked: false,
        createdAt: faker.date.anytime(),
        userId: user.id
      }
    })

    it('should delete an todo', async () => {
      jest.spyOn(todosRepository, 'findFirst').mockResolvedValue(todo)
      jest.spyOn(todosRepository, 'delete').mockResolvedValue(todo)

      const result = await deleteTodoStatusUseCase.execute(todo.id, user.id)

      expect(result).toBe(todo)
    })
  })
})
