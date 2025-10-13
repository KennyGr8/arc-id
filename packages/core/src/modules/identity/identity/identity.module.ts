// packages/core/src/modules/identity/identity.module.ts
import { useProvider, registerProviders } from '@arc-id/runtime'
import { logger } from '@arc-id/common'
import { IdentityService } from './identity.service'
import { identityRoutes } from './identity.routes'

// called by runtime loader
export async function initModule() {
  logger.info('[IdentityModule] initializing')

  // runtime must have registered these providers:
  const db = useProvider('db')             // DB adapter map (db.identityAdapter, db.emailTokenAdapter, ...)
  const mailer = useProvider('mailer')     // mailer adapter (sendEmail)
  const config = useProvider('config')     // optional config

  // create services for this module
  const identityService = new IdentityService(
    db.identityAdapter,
    db.emailTokenAdapter, // to store email verification tokens
    mailer,
    config
  )

  // register the service into runtime container so other modules can reuse it
  registerProviders({ identityService })

  // if runtime provides an HTTP app/router, register routes
  try {
    const http = useProvider('http') // optional Express/Fastify app
    identityRoutes(http, identityService)
    logger.info('[IdentityModule] HTTP routes registered')
  } catch (err) {
    logger.info('[IdentityModule] no HTTP provider found — skipping route registration')
  }

  logger.info('[IdentityModule] initialized')
}
