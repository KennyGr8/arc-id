import type { AccessToken } from "@generated/postgres";
import type { CreateAccessTokenDTO, IBaseAdapter } from "../../index";

export interface IAccessTokenAdapter extends IBaseAdapter<any> {
  createToken(data: CreateAccessTokenDTO): Promise<AccessToken>
  revokeToken(token: string): Promise<void>
  findByToken(token: string): Promise<AccessToken | null>
  findByJti(jti: string): Promise<AccessToken | null>
}
