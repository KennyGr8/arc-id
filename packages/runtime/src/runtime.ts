// packages/runtime/src/runtime.ts
import { initProviders, registerProviders, getContainer, loadModules, runtimeEvents } from './bootstrap'
import { logger } from '@arc-id/common'
import type { RuntimeContext } from './bootstrap'

export async function initRuntime(modules: string[] = []) {
  logger.info('🧠 Bootstrapping Arc Runtime...')

  // Step 1: Init Providers
  const providers = await initProviders()
  registerProviders(providers)

  // Step 2: Create Context
  const ctx: RuntimeContext = {
    providers: getContainer() as any,
    events: runtimeEvents,
  }

  // Step 3: Load Modules
  if (modules.length > 0) {
    await loadModules(modules)
  }

  // Step 4: Emit Ready Event
  logger.info('🚀 Arc Runtime ready.')
  runtimeEvents.emit('runtime:ready', ctx)

  return ctx
}
