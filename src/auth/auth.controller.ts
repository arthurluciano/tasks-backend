import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignInUserDto } from './domain/dto/signin-user.dto'
import { SignUpUserDto } from './domain/dto/signup-user.dto'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() data: SignUpUserDto) {
    return this.authService.signUp(data)
  }

  @Post('/sign-in')
  async signIn(@Body() data: SignInUserDto) {
    return this.authService.signIn(data)
  }
}
