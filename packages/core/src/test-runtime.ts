// packages/core/src/test-runtime.ts
import 'dotenv/config'
import { startCore } from './index.js'

startCore()
  .then(() => console.log('✅ ArcID Core Booted Successfully'))
  .catch(err => console.error('❌ Boot failed:', err))
