export interface IBaseAdapter<TClient = any> {
  switchClient(newClient: TClient): void
}