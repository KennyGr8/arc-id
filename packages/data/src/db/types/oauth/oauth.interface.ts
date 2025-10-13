import type { OAuthAccount } from '@generated/postgres'
import type { LinkOAuthAccountDTO, UnlinkOAuthAccountDTO, IBaseAdapter } from '../../index'

export interface IOAuthAccountAdapter extends IBaseAdapter<any> {
  linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount>
  findByProviderIdentityId(provider: string, providerUserId: string): Promise<OAuthAccount | null>
  findByIdentity(identityId: string): Promise<OAuthAccount[]>
  unlinkAccount(id: string): Promise<void>
  unlinkByIdentity(data: UnlinkOAuthAccountDTO): Promise<void>
}
