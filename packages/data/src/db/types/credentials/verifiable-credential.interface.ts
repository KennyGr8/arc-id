// types/verifiable-credential.interface.ts
import type { VerifiableCredential } from '@generated/postgres';
import type { CreateVerifiableCredentialDTO, UpdateVerifiableCredentialDTO, IBaseAdapter } from '../../index';

export interface IVerifiableCredentialAdapter extends IBaseAdapter {
  createCredential(data: CreateVerifiableCredentialDTO): Promise<VerifiableCredential>
  updateCredential(id: string, data: UpdateVerifiableCredentialDTO): Promise<VerifiableCredential>
}
