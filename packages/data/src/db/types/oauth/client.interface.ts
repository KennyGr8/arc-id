import type { Client } from "@generated/postgres";
import type { CreateClientDTO, UpdateClientDTO, IBaseAdapter } from "../../index";

export interface IClientAdapter extends IBaseAdapter<any> {
  createClient(data: CreateClientDTO): Promise<Client>
  updateClient(id: string, data: UpdateClientDTO): Promise<Client>
  findByClientId(clientId: string): Promise<Client | null>
  deleteClient(id: string): Promise<void>
}