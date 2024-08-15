# HTTPClient Class Documentation

## Overview

The `HTTPClient` class is a flexible and configurable HTTP client designed for making various types of HTTP requests (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and custom methods) in a standardized manner. It allows users to customize the configuration at both the client level and per-request level. This class supports JSON requests and responses, automatically handling JSON parsing if specified.

## Constructor

### `HTTPClient(config: ClientConfig = {})`

- **Parameters:**
  - `config`: An optional `ClientConfig` object that sets the default configuration for the client instance. [Reference](#clientconfig)

- **Example:**
  ```typescript
  const client = new HTTPClient({ base: 'https://api.example.com' })
  ```

## Methods

### `get(path: string, init: RequestOptions = {}, config: ClientConfig = {})`

- **Description:** Sends a `GET` request to the specified `path`.

- **Parameters:**
  - `path`: The endpoint path (appended to the `base` URL defined by ClientConfig in [constructor](#httpclientconfig-clientconfig--)).
  - `init`: Optional `RequestOptions` to override the default request options. [Reference](#requestoptions)
  - `config`: Optional `ClientConfig` to override the client instance's default configuration for this request. [Reference](#clientconfig)

- **Returns:** A `Promise` that resolves to a `RequestResponse`. [Reference](#requestresponse)

### `post(path: string, body: any, init: RequestOptions = {}, config: ClientConfig = {})`

- **Description:** Sends a `POST` request to the specified `path` with the provided `body`.

- **Parameters:**
  - `path`: The endpoint path.
  - `body`: The request body, which will be stringified if `json` is `true`. [Reference](#httpclientconfig-clientconfig--)
  - `init`: Optional `RequestOptions`. [Reference](#requestoptions)
  - `config`: Optional `ClientConfig`. [Reference](#clientconfig)

- **Returns:** A `Promise` that resolves to a `RequestResponse`. [Reference](#requestresponse)

### `put(path: string, body: any, init: RequestOptions = {}, config: ClientConfig = {})`

- **Description:** Sends a `PUT` request to the specified `path` with the provided `body`.

- **Parameters:** Same as `post()`.

- **Returns:** A `Promise` that resolves to a `RequestResponse`. [Reference](#requestresponse)

### `patch(path: string, body: any, init: RequestOptions = {}, config: ClientConfig = {})`

- **Description:** Sends a `PATCH` request to the specified `path` with the provided `body`.

- **Parameters:** Same as `post()`.

- **Returns:** A `Promise` that resolves to a `RequestResponse`. [Reference](#requestresponse)

### `delete(path: string, init: RequestOptions = {}, config: ClientConfig = {})`

- **Description:** Sends a `DELETE` request to the specified `path`.

- **Parameters:** 
  - `path`: The endpoint path.
  - `init`: Optional `RequestOptions`. [Reference](#requestoptions)
  - `config`: Optional `ClientConfig`. [Reference](#clientconfig)

- **Returns:** A `Promise` that resolves to a `RequestResponse`. [Reference](#requestresponse)

### `other(method: string, path: string, init: RequestInit = {}, config: ClientConfig = {})`

- **Description:** Sends a request with a custom HTTP method.

- **Parameters:**
  - `method`: The HTTP method (e.g., `HEAD`, `OPTIONS`).
  - `path`: The endpoint path.
  - `init`: Optional `RequestInit` (Fetch API).
  - `config`: Optional `ClientConfig`. [Reference](#clientconfig)

- **Returns:** A `Promise` that resolves to a `RequestResponse`. [Reference](#requestresponse)

## Interfaces and Types

### `ClientConfig`

The `ClientConfig` interface defines the configuration options available for the `HTTPClient`.

- **Properties:**
  - `base?: string` (default: ""): Optional base URL for all requests made with the client.
  - `json?: boolean` (default: true): If `true`, the client automatically adds `Content-Type: application/json` to headers and stringifies request bodies.
  - `parse?: boolean` (default: true if config.json is true): If `true`, the client automatically parses JSON responses.

### `RequestOptions`

The `RequestOptions` type is a simplified version of the `RequestInit` interface (Fetch API), excluding the `method` and `body` properties. It allows you to specify options for a request, such as headers, credentials, and more.

```typescript
type RequestOptions = Omit<RequestInit, 'method' | 'body'>
```

### `RequestResponse`

The `RequestResponse` interface extends the `Response` interface, overriding the `json` method to ensure it returns a typed promise.

- **Properties:**
  - Inherits all properties from `Response` (Fetch API).
  - `json: <T = unknown>() => Promise<T>`: A method that returns a `Promise` with the parsed JSON object of type `T`.

## Example Usage

```typescript
const client = new HTTPClient({
  base: 'https://api.example.com',
})

// GET request
client.get('/users')
  .then(response => console.log(response))
  .catch(error => console.error(error))

// POST request with a JSON body
client.post('/users', { name: 'John Doe' })
  .then(response => console.log(response))
  .catch(error => console.error(error))
```
