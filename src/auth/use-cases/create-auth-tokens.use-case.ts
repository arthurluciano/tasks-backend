import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms'

@Injectable()
export class CreateAuthTokensUseCase {
  constructor(private jwtService: JwtService) {}

  async execute(userId: string) {
    const accessToken = await this.generateAccessToken(userId)

    const refreshToken = await this.generateRefreshToken(userId)

    return { accessToken, refreshToken }
  }

  private async generateAccessToken(userId: string) {
    const expiresIn = this.tokenExpiresIn(process.env.ACCESS_TOKEN_EXPIRES_IN)

    const accessToken = await this.jwtService.signAsync({ sub: userId }, { expiresIn })

    return { token: accessToken, expiresIn }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async generateRefreshToken(userId: string) {
    const refreshToken = 'not-implemented'

    return { token: refreshToken, expiresIn: 1 }
  }

  private tokenExpiresIn(value: string) {
    return ms(value)
  }
}
