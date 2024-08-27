import { ClientConfig } from '../types/client-config'

export function normalizeConfig(config: ClientConfig): Required<ClientConfig> {
  return ({
    base: config.base ?? '',
    json: config.json ?? true,
    parse: config.parse ?? Boolean(config.json),
    headers: config.headers ?? (() => ({})),
  })
}
