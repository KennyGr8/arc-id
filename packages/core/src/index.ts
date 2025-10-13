// packages/core/src/test-runtime.ts
import { initRuntime } from '@arc-id/runtime'
import { logger } from '@arc-id/common'

export async function startCore() {
  logger.info('🧩 Starting ArcID Core (Test Mode)...')

  const coreModules = [
    './modules/test/index.js', // 👈 test first
  ]

  await initRuntime(coreModules)

  logger.info('✅ ArcID Core test run complete')
}

if (require.main === module) {
  startCore().catch(err => {
    console.error('❌ Boot failed:', err)
    process.exit(1)
  })
}
