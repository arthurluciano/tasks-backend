import { Global, Module } from '@nestjs/common'

import { HashService } from './hash.service'
import { PrismaService } from './infra/prisma.service'

@Global()
@Module({
  exports: [PrismaService, HashService],
  providers: [PrismaService, HashService]
})
export class SharedModule {}
