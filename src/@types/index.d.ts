import { User } from '@prisma/client'

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Env {}
  }

  namespace Express {
    interface Request {
      userId?: string
      user?: User
    }
  }
}
