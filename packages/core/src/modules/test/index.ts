// packages/core/src/modules/test/index.ts
import { logger } from '@arc-id/common'
import type { RuntimeContext } from '@arc-id/runtime'

export async function initModule(ctx: RuntimeContext) {
  logger.info('🧩 [TestModule] initializing...')

  const db = ctx.providers.db
  logger.info('🧪 DB Provider:', db?.constructor?.name ?? 'Not found')

  ctx.events.on('runtime:ready', () => {
    logger.info('📢 [TestModule] runtime is ready!')
  })

  logger.info('✅ [TestModule] initialized successfully')
}
