import { Injectable } from '@nestjs/common'

import { SignInUserDto } from './domain/dto/signin-user.dto'
import { SignUpUserDto } from './domain/dto/signup-user.dto'
import { CreateAuthTokensUseCase } from './use-cases/create-auth-tokens.use-case'
import { SignInUserUseCase } from './use-cases/signin-user.use-case'
import { SignUpUserUseCase } from './use-cases/signup-user.use-case'

@Injectable()
export class AuthService {
  constructor(
    private signUpUserUseCase: SignUpUserUseCase,
    private signInUserUseCase: SignInUserUseCase,
    private createAuthTokensUseCase: CreateAuthTokensUseCase
  ) {}

  async signUp(data: SignUpUserDto) {
    return await this.signUpUserUseCase.execute(data)
  }

  async signIn(data: SignInUserDto) {
    return await this.signInUserUseCase.execute(data)
  }

  async createAuthTokens(userId: string) {
    return await this.createAuthTokensUseCase.execute(userId)
  }
}
