// packages/runtime/src/bootstrap/loader.ts
import path from 'path'
import { logger } from '@arc-id/common'
import type { RuntimeContext } from './context'
import { getContainer } from './container'
import { runtimeEvents } from './events'

export async function loadModules(modulePaths: string[]) {
  logger.info(`🧩 Loading ${modulePaths.length} modules...`)

  const ctx: RuntimeContext = {
    providers: getContainer() as any,
    events: runtimeEvents,
  }

  for (const modulePath of modulePaths) {
    try {
      const resolved = path.resolve(modulePath)
      const mod = await import(resolved)
      if (mod?.initModule) {
        await mod.initModule(ctx)
        logger.info(`✅ Loaded module: ${modulePath}`)
      } else {
        logger.warn(`⚠️ Module ${modulePath} has no initModule() export`)
      }
    } catch (error) {
      logger.error(`❌ Failed to load module: ${modulePath}`, error)
    }
  }
}
