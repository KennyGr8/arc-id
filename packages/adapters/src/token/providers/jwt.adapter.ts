// packages/adapters/src/token/jwt.adapter.ts
import jwt from 'jsonwebtoken'
import { TokenAdapter, TokenPayload } from './types'

export class JwtTokenAdapter implements TokenAdapter {
  private secret: string

  constructor(secret?: string) {
    this.secret = secret || process.env.JWT_SECRET || 'supersecret'
  }

  async sign(
    payload: TokenPayload,
    options?: { expiresIn?: string | number }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.secret,
        { expiresIn: options?.expiresIn || '1h' },
        (err, token) => {
          if (err || !token) return reject(err)
          resolve(token)
        }
      )
    })
  }

  async verify(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded as TokenPayload)
      })
    })
  }

  async decode(token: string): Promise<TokenPayload | null> {
    const decoded = jwt.decode(token)
    return decoded as TokenPayload | null
  }
}
