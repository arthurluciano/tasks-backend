import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../shared/infra/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data })
  }

  async findUnique(args: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(args)
  }
}
