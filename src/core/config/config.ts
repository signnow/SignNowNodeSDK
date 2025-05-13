/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import * as dotenv from 'dotenv';

const DEFAULT_DOWNLOADS_DIR = './storage/downloads';
const CLIENT_NAME = 'SignNowApiClient/v3.0.0 (JS)';

dotenv.config();

export class Config {
  constructor(
    private SIGNNOW_API_HOST = process.env.SIGNNOW_API_HOST || '',
    private SIGNNOW_API_BASIC_TOKEN = process.env.SIGNNOW_API_BASIC_TOKEN || '',
    private SIGNNOW_API_USERNAME = process.env.SIGNNOW_API_USERNAME || '',
    private SIGNNOW_API_PASSWORD = process.env.SIGNNOW_API_PASSWORD || '',
    private SIGNNOW_DOWNLOADS_DIR = process.env.SIGNNOW_DOWNLOADS_DIR || '',
  ) {}

  public getApiHost(): string {
    return this.SIGNNOW_API_HOST;
  }

  public getApiBasicToken(): string {
    return this.SIGNNOW_API_BASIC_TOKEN;
  }

  public getApiUsername(): string {
    return this.SIGNNOW_API_USERNAME;
  }

  public getApiPassword(): string {
    return this.SIGNNOW_API_PASSWORD;
  }

  public getDownloadDirectory(): string {
    return this.SIGNNOW_DOWNLOADS_DIR || DEFAULT_DOWNLOADS_DIR;
  }

  public getClientName(): string {
    return CLIENT_NAME;
  }
}
