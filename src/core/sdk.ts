/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { ApiClient } from './apiClient';
import { Config } from './config/config';
import { TokenPost } from '../api/auth/request/tokenPost';
import { TokenPost as TokenResponse } from '../api/auth/response/tokenPost';

export class Sdk {
  private API_VERSION = '2024-11-27';

  private GRANT_TYPE_PASSWORD = 'password';

  private apiClient: ApiClient;

  private config: Config;

  constructor() {
    this.apiClient = new ApiClient();
    this.config = new Config();
  }

  public async authenticate(username = this.config.getApiUsername(), password = this.config.getApiPassword()): Promise<Sdk> {
    const request = new TokenPost(username, password, this.GRANT_TYPE_PASSWORD);
    const response = await this.apiClient.send<TokenResponse>(request);

    this.apiClient.setBearerToken(response.access_token);

    return this;
  }

  public version(): string {
    return this.API_VERSION;
  }

  public getClient(): ApiClient {
    return this.apiClient;
  }

  public actualBearerToken(): string | undefined {
      return this.apiClient.getBearerToken();
  }

  public setBearerToken(bearerToken: string): Sdk {
    this.apiClient.setBearerToken(bearerToken);
    return this;
  }
}
