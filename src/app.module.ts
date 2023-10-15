import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { SharedModule } from './shared/shared.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [AuthModule, SharedModule, UsersModule],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
