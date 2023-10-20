import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms'

export interface CreateAuthTokensUseCaseResponse {
  accessToken: {
    token: string
    expiresIn: number
  }
  refreshToken: {
    token: string
    expiresIn: number
  }
}

@Injectable()
export class CreateAuthTokensUseCase {
  constructor(private jwtService: JwtService) {}

  async execute(userId: string) {
    const accessToken = await this.generateAccessToken(userId)

    const refreshToken = await this.generateRefreshToken(userId)

    return { accessToken, refreshToken }
  }

  private async generateAccessToken(userId: string) {
    const expiresIn = this.tokenExpiresIn('ACCESS_TOKEN_EXPIRES_IN')

    const accessToken = await this.jwtService.signAsync({ sub: userId }, { expiresIn })

    return { token: accessToken, expiresIn }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async generateRefreshToken(userId: string) {
    const expiresIn = this.tokenExpiresIn('REFRESH_TOKEN_EXPIRES_IN')

    const refreshToken = 'not-implemented'

    return { token: refreshToken, expiresIn }
  }

  private tokenExpiresIn(value: string) {
    const expiresIn = ms(process.env[value]!)

    return expiresIn
  }
}
