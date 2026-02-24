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
import { SdkParameters } from '../types/sdkParameters';

export class Sdk {
  private readonly API_VERSION = '2026-01-19';

  private readonly GRANT_TYPE_PASSWORD = 'password';

  private apiClient: ApiClient;

  private config: Config;

  constructor({ apiHost, basicToken, apiKey, downloadDirectory }: SdkParameters = {}) {
    this.config = new Config({
      apiHost,
      basicToken,
      downloadDirectory,
      apiKey,
    });
    this.apiClient = new ApiClient(this.config, this.config.getApiKey());
  }

  public async authenticate(username = this.config.getUsername(), password = this.config.getPassword()): Promise<Sdk> {
    if (username) {
      this.config.setUsername(username);
    }

    if (password) {
      this.config.setPassword(password);
    }

    const request = new TokenPost(this.config.getUsername(), this.config.getPassword(), this.GRANT_TYPE_PASSWORD);
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
