// types/external-identifier.interface.ts
import type { ExternalIdentifier } from '@generated/postgres';
import type { CreateExternalIdentifierDTO, UpdateExternalIdentifierDTO, IBaseAdapter } from '../../index';

export interface IExternalIdentifierAdapter extends IBaseAdapter {
  createIdentifier(data: CreateExternalIdentifierDTO): Promise<ExternalIdentifier>
  updateIdentifier(id: string, data: UpdateExternalIdentifierDTO): Promise<ExternalIdentifier>
  findByTypeAndHash(type: string, valueHash: string): Promise<ExternalIdentifier | null>
}
