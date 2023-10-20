import { faker } from '@faker-js/faker'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { mock } from 'ts-mockito'

import {
  CreateAuthTokensUseCase,
  CreateAuthTokensUseCaseResponse
} from '../use-cases/create-auth-tokens.use-case'

describe('/auth', () => {
  describe('create auth tokens use-case', () => {
    let jwtService: JwtService

    let createAuthTokensUseCase: CreateAuthTokensUseCase

    let user: User
    let tokens: CreateAuthTokensUseCaseResponse

    beforeEach(() => {
      jwtService = mock(JwtService)

      createAuthTokensUseCase = new CreateAuthTokensUseCase(jwtService)

      user = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: faker.internet.password()
      }

      tokens = {
        accessToken: {
          token: faker.string.alphanumeric(),
          expiresIn: faker.number.int()
        },
        refreshToken: {
          token: faker.string.alphanumeric(),
          expiresIn: faker.number.int()
        }
      }
    })

    it('should create tokens', async () => {
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(tokens.accessToken.token)

      const result = await createAuthTokensUseCase.execute(user.id)

      expect(result.accessToken.token).toBe(tokens.accessToken.token)
      // expect(result.refreshToken.token).toBe(tokens.refreshToken.token)
    })
  })
})
