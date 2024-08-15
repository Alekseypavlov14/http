import { ClientConfig } from '../types/client-config'

export function normalizeConfig(config: ClientConfig): Required<ClientConfig> {
  return ({
    base: config.base ?? '',
    json: config.json ?? false,
    parse: config.parse ?? Boolean(config.json),
  })
}
