import { Injectable } from '@nestjs/common'

import { SignUpUserDto } from './domain/dto/signup-user.dto'
import { SignUpUserUseCase } from './use-cases/signup-user.use-case'

@Injectable()
export class AuthService {
  constructor(private signUpUserUseCase: SignUpUserUseCase) {}

  async signUp(data: SignUpUserDto) {
    return this.signUpUserUseCase.execute(data)
  }
}
