/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export enum HttpStatusCode {
  REDIRECT = 300,
  CLIENT_ERROR = 400,
  SERVER_ERROR = 500,
}

export enum HttpMethod {
 PUT = 'put',
 GET = 'get',
 POST = 'post',
 DELETE = 'delete',
 PATCH = 'patch',
}

export enum HttpAuthType {
  BEARER = 'bearer',
  BASIC = 'basic',
}
