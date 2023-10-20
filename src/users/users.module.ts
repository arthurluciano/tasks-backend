import { Module } from '@nestjs/common'

import { UsersUseCases } from './use-cases'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, ...UsersUseCases, UsersService],
  exports: [UsersRepository]
})
export class UsersModule {}
