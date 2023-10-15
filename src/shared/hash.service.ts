import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
  private SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 16

  async hash(value: string) {
    return bcrypt.hash(value, this.SALT_ROUNDS)
  }

  async compare(value: string, encrypted: string) {
    return bcrypt.compare(value, encrypted)
  }
}
