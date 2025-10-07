// packages/runtime/src/bootstrap/loader.ts
import path from 'path'
import { logger } from '@arc-id/common'

export async function loadModules(modulePaths: string[]) {
  logger.info(`🧩 Loading ${modulePaths.length} modules...`)

  for (const modulePath of modulePaths) {
    try {
      const resolved = path.resolve(modulePath)
      const mod = await import(resolved)
      if (mod?.initModule) {
        await mod.initModule()
        logger.info(`✅ Loaded module: ${modulePath}`)
      } else {
        logger.warn(`⚠️ Module ${modulePath} has no initModule() export`)
      }
    } catch (error) {
      logger.error(`❌ Failed to load module: ${modulePath}`, error)
    }
  }
}
