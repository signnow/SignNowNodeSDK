/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Response } from 'node-fetch';

export class SignNowApiException extends Error {
  constructor(message: string, private response: Response) {
    super(message);
    this.name = 'SignNowApiException';
  }

  public getResponse(): Response {
    return this.response;
  }
}
