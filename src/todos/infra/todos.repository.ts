import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../../shared/infra/prisma.service'

@Injectable()
export class TodosRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoCreateInput) {
    return await this.prisma.todo.create({ data })
  }

  async update(args: Prisma.TodoUpdateArgs) {
    return await this.prisma.todo.update(args)
  }

  async findFirst(args: Prisma.TodoFindFirstArgs) {
    return await this.prisma.todo.findFirst(args)
  }

  async delete(args: Prisma.TodoDeleteArgs) {
    return await this.prisma.todo.delete(args)
  }
}
