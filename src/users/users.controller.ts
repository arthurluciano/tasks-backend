import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'

import { UseUser } from './infra/decorators/use-user.decorator'
import { UserGuard } from './infra/guards/user.guard'
import { UsersService } from './users.service'

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/whoami')
  @UseGuards(UserGuard)
  async whoami(@UseUser() user: User) {
    return user
  }
}
