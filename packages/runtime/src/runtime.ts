// packages/runtime/src/runtime.ts
import { initProviders, registerDependencies, startServer } from '../index';

export async function initRuntime() {
  const providers = await initProviders();
  registerDependencies(providers);

  await startServer(providers);

  console.log('🚀 Runtime started successfully!');
}
