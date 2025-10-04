export class CoreRegistry {
  static db: ReturnType<typeof db.loadDBProvider>
  static cache: ReturnType<typeof cache.loadCacheProvider>
  static mail: ReturnType<typeof mail.loadMailProvider>
  static billing: ReturnType<typeof billing.loadBillingProvider>

  static async init() {
    const { database, cacheStore, mailer, billingSystem } = await initCore()
    this.db = database
    this.cache = cacheStore
    this.mail = mailer
    this.billing = billingSystem
  }
}
