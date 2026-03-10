/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import * as dotenv from 'dotenv';

import { ConfigParameters } from '../../types/configParameters';

const DEFAULT_DOWNLOADS_DIR = './storage/downloads';
const DEFAULT_API_HOST = 'https://api.signnow.com';
const CLIENT_NAME = 'SignNowApiClient/v3.2.0 (JS)';

dotenv.config();

export class Config {
  private readonly apiHost: string;

  private readonly basicToken: string;

  private username: string;

  private password: string;

  private readonly downloadDirectory: string;

  private readonly apiKey: string;

  constructor({
    apiHost = process.env.SIGNNOW_API_HOST || DEFAULT_API_HOST,
    basicToken = process.env.SIGNNOW_API_BASIC_TOKEN || '',
    username = process.env.SIGNNOW_API_USERNAME || '',
    password = process.env.SIGNNOW_API_PASSWORD || '',
    downloadDirectory = process.env.SIGNNOW_DOWNLOADS_DIR || DEFAULT_DOWNLOADS_DIR,
    apiKey = process.env.SIGNNOW_API_KEY || '',
  }: ConfigParameters = {}) {
    this.apiHost = apiHost;
    this.basicToken = basicToken;
    this.username = username;
    this.password = password;
    this.downloadDirectory = downloadDirectory;
    this.apiKey = apiKey;
  }

  public getApiHost(): string {
    return this.apiHost;
  }

  public getApiBasicToken(): string {
    return this.basicToken;
  }

  public getApiUsername(): string {
    return this.username;
  }

  public getApiPassword(): string {
    return this.password;
  }

  public getDownloadDirectory(): string {
    return this.downloadDirectory;
  }

  public getClientName(): string {
    return CLIENT_NAME;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}
