// packages/runtime/src/bootstrap/app.ts
import { loadModules, runtimeEvents, initProviders, registerProviders } from '../index'
import { logger } from '@arc-id/common'

export async function createRuntime(modules: string[]) {
  logger.info('🧠 Bootstrapping ArcID Runtime...')

  // Step 1: Init Providers
  const providers = await initProviders()
  registerProviders(providers)

  // Step 2: Load Core Modules
  await loadModules(modules)

  logger.info('🚀 Arc Runtime ready.')

  runtimeEvents.emit('runtime:ready', providers)
}
