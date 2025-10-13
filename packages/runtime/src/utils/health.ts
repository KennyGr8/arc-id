// packages/runtime/src/utils/health.ts
import { getContainer } from './bootstrap'
export function checkRuntimeHealth() {
  const container = getContainer()
  return Object.keys(container)
}
