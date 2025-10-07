import type { IAuthorizationCodeAdapter, CreateAuthorizationCodeDTO, AuthorizationCode } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryAuthorizationCodeAdapter implements IAuthorizationCodeAdapter {
  private codes: AuthorizationCode[] = [];

  async createCode(data: CreateAuthorizationCodeDTO): Promise<AuthorizationCode> {
    const code: AuthorizationCode = {
      id: generateId(),
      createdAt: new Date(),
      consumed: false,
      redirectUri: data.redirectUri ?? null,
      ...data,
      scopes: Array.isArray(data.scopes) ? data.scopes : [data.scopes],
    };
    this.codes.push(code);
    return code;
  }

  async consumeCode(codeStr: string): Promise<AuthorizationCode | null> {
    const code = await this.findByCode(codeStr);
    if (!code) return null;
    code.consumed = true;
    return code;
  }

  async findByCode(codeStr: string): Promise<AuthorizationCode | null> {
    return this.codes.find(c => c.code === codeStr) ?? null;
  }

  switchClient(_newClient?: any) { return this }
}
