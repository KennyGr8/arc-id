import type { Consent } from '@generated/postgres';
import type { CreateConsentDTO, UpdateConsentDTO, IBaseAdapter } from '../../index';

export interface IConsentAdapter extends IBaseAdapter {
  createConsent(data: CreateConsentDTO): Promise<Consent>
  updateConsent(id: string, data: UpdateConsentDTO): Promise<Consent>
}
