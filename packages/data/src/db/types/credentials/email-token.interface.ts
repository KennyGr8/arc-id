import type { EmailToken } from '@generated/postgres'
import type { CreateEmailTokenDTO, IBaseAdapter } from '../../index'

export interface IEmailTokenAdapter extends IBaseAdapter<any> {
  createToken(data: CreateEmailTokenDTO): Promise<EmailToken>
  findById(id: string): Promise<EmailToken | null>
  consumeToken(id: string): Promise<void>
}
