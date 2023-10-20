import { Injectable, NotFoundException } from '@nestjs/common'

import { UsersRepository } from '../infra/users.repository'

@Injectable()
export class WhoamiUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findUnique({ where: { id: userId }, select: { password: false } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
