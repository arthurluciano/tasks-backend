import { Module } from '@nestjs/common'

import { UsersRepository } from './infra/users.repository'
import { UsersUseCases } from './use-cases'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, ...UsersUseCases, UsersService],
  exports: [UsersRepository]
})
export class UsersModule {}
