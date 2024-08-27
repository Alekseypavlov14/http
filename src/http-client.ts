import { RequestResponse } from './types/request-response'
import { normalizeConfig } from './utils/normalize-config'
import { RequestOptions } from './types/request-options'
import { ClientConfig } from './types/client-config'
import { JSONHeaders } from './constants'
import { deepMerge } from '@oleksii-pavlov/deep-merge'

export class HTTPClient {
  private readonly config: Required<ClientConfig>

  constructor(config: ClientConfig = {}) {
    this.config = normalizeConfig(config)
  }

  get<Result>(path: string, init: RequestOptions = {}, config: ClientConfig = {}) {
    const fullConfig = deepMerge<Required<ClientConfig>>(this.config, config)

    return fetch(this.getRequestPath(path, fullConfig.base), {
      ...init,
      method: 'GET',
      headers: this.getHeaders(init.headers || {}, fullConfig.headers(), fullConfig.json),
    })
      .then(response => fullConfig.parse 
        ? this.parseJSONResponse<Result>(response)
        : new Promise<Result>((res) => res(response as Result))
      )
  }

  post<Body, Result>(path: string, body: Body, init: RequestOptions = {}, config: ClientConfig = {}) {
    const fullConfig = deepMerge<Required<ClientConfig>>(this.config, config)

    return fetch(this.getRequestPath(path, fullConfig.base), {
      ...init,
      method: 'POST',
      headers: this.getHeaders(init.headers || {}, fullConfig.headers(), fullConfig.json),
      body: this.getRequestBody(body)
    })
      .then(response => fullConfig.parse 
        ? this.parseJSONResponse<Result>(response) 
        : new Promise<Result>((res) => res(response as Result))
      )
  }

  put<Body, Result>(path: string, body: Body, init: RequestOptions = {}, config: ClientConfig = {}) {
    const fullConfig = deepMerge<Required<ClientConfig>>(this.config, config)

    return fetch(this.getRequestPath(path, fullConfig.base), {
      ...init,
      method: 'PUT',
      headers: this.getHeaders(init.headers || {}, fullConfig.headers(), fullConfig.json),
      body: this.getRequestBody(body)
    })
      .then(response => fullConfig.parse 
        ? this.parseJSONResponse<Result>(response) 
        : new Promise<Result>((res) => res(response as Result))
      )
  }

  patch<Body, Result>(path: string, body: Body, init: RequestOptions = {}, config: ClientConfig = {}) {
    const fullConfig = deepMerge<Required<ClientConfig>>(this.config, config)

    return fetch(this.getRequestPath(path, fullConfig.base), {
      ...init,
      method: 'PATCH',
      headers: this.getHeaders(init.headers || {}, fullConfig.headers(), fullConfig.json),
      body: this.getRequestBody(body)
    })
      .then(response => fullConfig.parse 
        ? this.parseJSONResponse<Result>(response) 
        : new Promise<Result>((res) => res(response as Result))
      )
  }

  delete<Result>(path: string, init: RequestOptions = {}, config: ClientConfig = {}) {
    const fullConfig = deepMerge<Required<ClientConfig>>(this.config, config)

    return fetch(this.getRequestPath(path, fullConfig.base), {
      ...init,
      method: 'DELETE',
      headers: this.getHeaders(init.headers || {}, fullConfig.headers(), fullConfig.json),
    })
      .then(response => fullConfig.parse 
        ? this.parseJSONResponse<Result>(response)
        : new Promise<Result>((res) => res(response as Result))
      )
  }

  other<Result>(method: string, path: string, init: RequestInit = {}, config: ClientConfig = {}) {
    const fullConfig = deepMerge<Required<ClientConfig>>(this.config, config)

    return fetch(this.getRequestPath(path, fullConfig.base), {
      ...init,
      method,
      headers: this.getHeaders(init.headers || {}, fullConfig.headers(), fullConfig.json),
    })
      .then(response => fullConfig.parse 
        ? this.parseJSONResponse<Result>(response) 
        : new Promise<Result>((res) => res(response as Result))
      )
  }

  private getRequestPath(path: string, base: string) {
    return base + path
  }

  private getHeaders(initHeaders: HeadersInit, configHeaders: HeadersInit, json: boolean) {
    const normalizedConfigHeaders = configHeaders instanceof Array ? Object.fromEntries(configHeaders) : configHeaders
    const normalizedInitHeaders = initHeaders instanceof Array ? Object.fromEntries(initHeaders) : (initHeaders || {})
    return Object.assign({}, normalizedConfigHeaders, normalizedInitHeaders, json ? JSONHeaders : {})
  }
  
  private getRequestBody(body: any) {
    return (body instanceof FormData || typeof body === 'string')
      ? body 
      : JSON.stringify(body)
  }

  private parseJSONResponse<T>(response: RequestResponse) {
    return response.json<T>()
  }
}
