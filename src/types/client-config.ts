export interface ClientConfig {
  base?: string
  json?: boolean
  parse?: boolean
  headers?: () => HeadersInit
}