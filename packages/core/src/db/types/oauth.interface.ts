import type { OAuthAccount } from '@generated/postgres'
import type { LinkOAuthAccountDTO, IBaseAdapter } from '../index'

export interface IOAuthAdapter extends IBaseAdapter<any> {
  linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount>
  findByProviderUserId(provider: string, providerUserId: string): Promise<OAuthAccount | null>
  findByUser(userId: string): Promise<OAuthAccount[]>
  unlinkAccount(id: string): Promise<void>
}
