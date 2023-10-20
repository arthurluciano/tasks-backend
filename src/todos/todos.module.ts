import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'

import { TodosRepository } from './infra/todos.repository'
import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'
import { TodoUseCases } from './use-cases'

@Module({
  imports: [UsersModule],
  controllers: [TodosController],
  providers: [...TodoUseCases, TodosService, TodosRepository]
})
export class TodosModule {}
