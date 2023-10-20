import { faker } from '@faker-js/faker'
import { Todo, User } from '@prisma/client'
import { mock } from 'ts-mockito'

import { TodosRepository } from '../infra/todos.repository'
import { CreateTodoUseCase } from '../use-cases/create-todo.use-case'

describe('/todos', () => {
  describe('create todo use-case', () => {
    let todosRepository: TodosRepository

    let createTodoUseCase: CreateTodoUseCase

    let user: User
    let todo: Todo

    beforeEach(() => {
      todosRepository = mock(TodosRepository)

      createTodoUseCase = new CreateTodoUseCase(todosRepository)

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

    it('should create an todo', async () => {
      jest.spyOn(todosRepository, 'create').mockResolvedValue(todo)

      const result = await createTodoUseCase.execute({ title: todo.title }, user.id)

      expect(result).toBe(todo)
    })
  })
})
