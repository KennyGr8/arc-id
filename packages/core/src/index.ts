// packages/core/src/index.ts
import { createRuntime } from '@arc-id/runtime'
import { config, logger } from '@arc-id/common'

export async function startCore() {
  logger.info('🧩 Starting ArcID Core...')

  // Define module entry points
  const coreModules = [
    './modules/auth/index.js',
    './modules/session/index.js',
    './modules/mfa/index.js',
  ]

  // Initialize runtime and load core modules
  await createRuntime(coreModules)

  logger.info('✅ ArcID Core initialized successfully')
}
