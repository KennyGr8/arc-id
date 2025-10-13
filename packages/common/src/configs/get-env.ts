import { env } from '../validators'

// Generic helper to get typed env values
export const getEnv = <K extends keyof typeof env>(key: K): (typeof env)[K] => {
  return env[key]
}
