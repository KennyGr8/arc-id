import { TokenType } from '../../index'

export interface CreateEmailTokenDTO {
  identityId: string
  type: TokenType
  token: string
  expiresAt: Date
  consumed?: boolean
}
