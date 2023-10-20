import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'
import { Todo, User } from '@prisma/client'
import { mock } from 'ts-mockito'

import { TodosRepository } from '../infra/todos.repository'
import { UpdateTodoStatusUseCase } from '../use-cases/update-todo-status.use-case'

describe('/todos', () => {
  describe('update todo status use-case', () => {
    let todosRepository: TodosRepository

    let updateTodoStatusUseCase: UpdateTodoStatusUseCase

    let user: User
    let todo: Todo

    beforeEach(() => {
      todosRepository = mock(TodosRepository)

      updateTodoStatusUseCase = new UpdateTodoStatusUseCase(todosRepository)

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

    it('should update status of todo', async () => {
      const updatedTodo = { ...todo, checked: true }

      jest.spyOn(todosRepository, 'findFirst').mockResolvedValue(todo)
      jest.spyOn(todosRepository, 'update').mockResolvedValue(updatedTodo)

      const result = await updateTodoStatusUseCase.execute({ checked: true, id: todo.id }, user.id)

      expect(result).toBe(updatedTodo)
    })

    it('should not update an todo if id not exists', async () => {
      jest.spyOn(todosRepository, 'findFirst').mockResolvedValue(null)
      jest.spyOn(todosRepository, 'delete').mockResolvedValue(null)

      await expect(
        updateTodoStatusUseCase.execute(
          {
            checked: true,
            id: todo.id
          },
          user.id
        )
      ).rejects.toBeInstanceOf(NotFoundException)
    })
  })
})
