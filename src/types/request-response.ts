export interface RequestResponse extends Omit<Response, 'json'> {
  json: <T = unknown>() => Promise<T>
}
