import { TokenType } from '../index'

export interface CreateEmailTokenDTO {
  userId: string
  type: TokenType
  token: string
  expiresAt: Date
  consumed?: boolean
}
