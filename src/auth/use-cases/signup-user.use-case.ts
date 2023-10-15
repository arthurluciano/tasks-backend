import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HashService } from 'src/shared/hash.service'

import { UsersRepository } from '../../users/users.repository'
import { SignUpUserDto } from '../domain/dto/signup-user.dto'

@Injectable()
export class SignUpUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
    private jwtService: JwtService
  ) {}

  async execute(data: SignUpUserDto) {
    const userAlreadyExists = await this.usersRepository.findUnique({
      where: {
        email: data.email
      }
    })

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists')
    }

    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Password not the same')
    }

    const encryptedPassword = await this.hashService.hash(data.password)

    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: encryptedPassword
    })

    delete user.password

    const accessToken = await this.jwtService.signAsync({ sub: user.id })

    return {
      tokens: {
        accessToken,
        refreshToken: 'not-implemented'
      },
      user
    }
  }
}
