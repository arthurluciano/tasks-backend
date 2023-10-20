import { faker } from '@faker-js/faker'
import { BadRequestException } from '@nestjs/common'
import { User } from '@prisma/client'
import { mock } from 'ts-mockito'

import { HashService } from '../../shared/hash.service'
import { UsersRepository } from '../../users/infra/users.repository'
import {
  CreateAuthTokensUseCase,
  CreateAuthTokensUseCaseResponse
} from '../use-cases/create-auth-tokens.use-case'
import { SignUpUserUseCase } from '../use-cases/signup-user.use-case'

describe('/auth', () => {
  describe('signup user use-case', () => {
    let usersRepository: UsersRepository
    let hashService: HashService

    let signUpUserUseCase: SignUpUserUseCase

    let user: User

    let createAuthTokensUseCase: CreateAuthTokensUseCase
    let tokens: CreateAuthTokensUseCaseResponse

    beforeEach(async () => {
      usersRepository = mock(UsersRepository)

      createAuthTokensUseCase = mock(CreateAuthTokensUseCase)
      hashService = mock(HashService)

      signUpUserUseCase = new SignUpUserUseCase(usersRepository, hashService, createAuthTokensUseCase)

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
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue(null)
      jest.spyOn(hashService, 'compare').mockResolvedValue(true)
      jest.spyOn(createAuthTokensUseCase, 'execute').mockResolvedValue(tokens)
      jest.spyOn(usersRepository, 'create').mockResolvedValue(user)

      const result = await signUpUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.password
      })

      expect(result.user).toBe(user)
      expect(result.tokens).toBe(tokens)
    })

    it('should not create an user with an existing email', async () => {
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue(user)

      await expect(() =>
        signUpUserUseCase.execute({
          name: user.name,
          email: user.email,
          password: user.password,
          confirmPassword: user.password
        })
      ).rejects.toThrow(BadRequestException)
    })
  })
})
