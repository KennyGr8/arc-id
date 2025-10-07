// types/dynamic.interface.ts
import type { DynamicRole, DynamicStatus } from '@generated/postgres';
import type { CreateDynamicRoleDTO, CreateDynamicStatusDTO, IBaseAdapter } from '../../index';

export interface IDynamicRoleAdapter extends IBaseAdapter<any> {
  createRole(data: CreateDynamicRoleDTO): Promise<DynamicRole>
  findById(id: string): Promise<DynamicRole | null>
  findByName(name: string): Promise<DynamicRole | null>
}

export interface IDynamicStatusAdapter extends IBaseAdapter<any> {
  createStatus(data: CreateDynamicStatusDTO): Promise<DynamicStatus>
  findById(id: string): Promise<DynamicStatus | null>
  findByName(name: string): Promise<DynamicStatus | null>
}
