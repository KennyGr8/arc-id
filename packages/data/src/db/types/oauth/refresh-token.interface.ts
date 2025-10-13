import type { RefreshToken } from "@generated/postgres";
import type { CreateRefreshTokenDTO, IBaseAdapter } from "../../index";

export interface IRefreshTokenAdapter extends IBaseAdapter<any> {
  createToken(data: CreateRefreshTokenDTO): Promise<RefreshToken>
  revokeToken(token: string): Promise<void>
  rotateToken(token: string): Promise<RefreshToken | null>
  findByToken(token: string): Promise<RefreshToken | null>
}
