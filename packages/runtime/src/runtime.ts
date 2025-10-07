// packages/runtime/src/runtime.ts
import { initProviders } from './index';

export async function initRuntime() {
  const providers = await initProviders();

  console.log('🚀 Runtime started successfully!');
}
