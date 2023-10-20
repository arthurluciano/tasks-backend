import { CreateTodoUseCase } from './create-todo.use-case'
import { DeleteTodoUseCase } from './delete-todo.use-case'
import { ListTodosUseCase } from './list-todos.use-case'
import { UpdateTodoStatusUseCase } from './update-todo-status.use-case'

export const TodoUseCases = [CreateTodoUseCase, UpdateTodoStatusUseCase, DeleteTodoUseCase, ListTodosUseCase]
