import { Injectable } from '@nestjs/common'

import { SignInUserDto } from './domain/dto/signin-user.dto'
import { SignUpUserDto } from './domain/dto/signup-user.dto'
import { SignInUserUseCase } from './use-cases/signin-user.use-case'
import { SignUpUserUseCase } from './use-cases/signup-user.use-case'

@Injectable()
export class AuthService {
  constructor(
    private signUpUserUseCase: SignUpUserUseCase,
    private signInUserUseCase: SignInUserUseCase
  ) {}

  async signUp(data: SignUpUserDto) {
    return await this.signUpUserUseCase.execute(data)
  }

  async signIn(data: SignInUserDto) {
    return await this.signInUserUseCase.execute(data)
  }
}
