// packages/adapters/src/token/types.ts
export interface TokenPayload {
  sub: string
  iss?: string
  aud?: string | string[]
  exp?: number
  iat?: number
  [key: string]: any
}

export interface TokenAdapter {
  sign(
    payload: TokenPayload,
    options?: { expiresIn?: string | number }
  ): Promise<string>
  verify(token: string): Promise<TokenPayload>
  decode(token: string): Promise<TokenPayload | null>
}
