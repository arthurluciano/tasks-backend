import { Injectable } from '@nestjs/common'

import { WhoamiUseCase } from './use-cases/whoami.use-case'

@Injectable()
export class UsersService {
  constructor(private whoamiUseCase: WhoamiUseCase) {}

  async whoami(userId: string) {
    return await this.whoamiUseCase.execute(userId)
  }
}
