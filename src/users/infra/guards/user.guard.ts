import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { AuthGuard } from '../../../auth/domain/guard/auth.guard'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UserGuard extends AuthGuard implements CanActivate {
  constructor(
    private usersRepository: UsersRepository,
    jwtService: JwtService
  ) {
    super(jwtService)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const request = context.switchToHttp().getRequest() as Request

    const id: string = request['userId']

    const user = await this.usersRepository.findUnique({ where: { id } })

    delete user.password

    if (!user) {
      throw new NotFoundException('User not found')
    }

    request.user = user

    return true
  }
}
