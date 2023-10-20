import { faker } from '@faker-js/faker'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { mock } from 'ts-mockito'

import { HashService } from '../../shared/hash.service'
import { UsersRepository } from '../../users/users.repository'
import {
  CreateAuthTokensUseCase,
  CreateAuthTokensUseCaseResponse
} from '../use-cases/create-auth-tokens.use-case'
import { SignInUserUseCase } from '../use-cases/signin-user.use-case'

describe('/auth', () => {
  describe('signin user use-case', () => {
    let usersRepository: UsersRepository
    let hashService: HashService

    let signInUserUseCase: SignInUserUseCase

    let user: User

    let createAuthTokensUseCase: CreateAuthTokensUseCase
    let tokens: CreateAuthTokensUseCaseResponse

    beforeEach(async () => {
      usersRepository = mock(UsersRepository)

      createAuthTokensUseCase = mock(CreateAuthTokensUseCase)
      hashService = mock(HashService)

      signInUserUseCase = new SignInUserUseCase(usersRepository, hashService, createAuthTokensUseCase)

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

    it('should be able to sign up user with credentials', async () => {
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue(user)
      jest.spyOn(hashService, 'compare').mockResolvedValue(true)
      jest.spyOn(createAuthTokensUseCase, 'execute').mockResolvedValue(tokens)

      const result = await signInUserUseCase.execute({
        email: user.email,
        password: user.password
      })

      expect(result.user).toBe(user)
      expect(result.tokens).toBe(tokens)
    })

    it('should not be able to authenticate user if not found', async () => {
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue(null)

      await expect(
        signInUserUseCase.execute({
          email: user.email,
          password: user.password
        })
      ).rejects.toBeInstanceOf(NotFoundException)
    })

    it('should not be able to authenticate with not same password', async () => {
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue(user)
      jest.spyOn(hashService, 'compare').mockResolvedValue(false)

      await expect(
        signInUserUseCase.execute({
          email: user.email,
          password: user.password
        })
      ).rejects.toBeInstanceOf(UnauthorizedException)
    })
  })
})
