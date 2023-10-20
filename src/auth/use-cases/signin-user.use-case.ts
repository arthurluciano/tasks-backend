import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'

import { HashService } from '../../shared/hash.service'
import { UsersRepository } from '../../users/users.repository'
import { SignInUserDto } from '../domain/dto/signin-user.dto'
import { CreateAuthTokensUseCase } from './create-auth-tokens.use-case'

@Injectable()
export class SignInUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
    private createAuthTokensUseCase: CreateAuthTokensUseCase
  ) {}

  async execute(data: SignInUserDto) {
    const user = await this.usersRepository.findUnique({
      where: {
        email: data.email
      }
    })

    if (!user) {
      throw new BadRequestException('Usuário não existe')
    }

    const isSamePassword = await this.hashService.compare(data.password, user.password)

    if (!isSamePassword) {
      throw new UnauthorizedException('A senha está incorreta.')
    }

    const tokens = await this.createAuthTokensUseCase.execute(user.id)

    return {
      tokens,
      user
    }
  }
}
