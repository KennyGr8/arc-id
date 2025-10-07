// packages/runtime/src/bootstrap/app.ts
import { initProviders } from './providers'
import { registerProviders } from './container'
import { loadModules } from './loader'
import { logger } from '@arc-id/common'

export async function createRuntime(modules: string[]) {
  logger.info('🧠 Bootstrapping Arc Runtime...')

  // Step 1: Init Providers
  const providers = await initProviders()
  registerProviders(providers)

  // Step 2: Load Core Modules
  await loadModules(modules)

  logger.info('🚀 Arc Runtime ready.')
}
