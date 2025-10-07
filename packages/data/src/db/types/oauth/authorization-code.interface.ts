import type { AuthorizationCode } from "@generated/postgres";
import type { CreateAuthorizationCodeDTO, IBaseAdapter } from "../../index";

export interface IAuthorizationCodeAdapter extends IBaseAdapter<any> {
  createCode(data: CreateAuthorizationCodeDTO): Promise<AuthorizationCode>
  consumeCode(code: string): Promise<AuthorizationCode | null>
  findByCode(code: string): Promise<AuthorizationCode | null>
}
