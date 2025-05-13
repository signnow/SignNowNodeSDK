/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { BaseClass } from '../../../types/baseClass';
import { HttpMethod } from '../../../core/contstants';
import { HttpAuthType } from '../../../core/contstants';

export class TokenPost implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private username: string,
    private password: string,
    private grantType: string,
    private scope: string = '*',
    private code: string = '',
  ) {}

  public getPayload(): Record<string, string> {
    return {
      username: this.username,
      password: this.password,
      grant_type: this.grantType,
      scope: this.scope,
      code: this.code,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/oauth2/token';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BASIC;
  }

  public getContentType(): string {
    return 'application/x-www-form-urlencoded';
  }

  public getQueryParams(): Record<string, string> {
    return this.queryParams;
  }

  public getUriParams(): null {
    return null;
  }
}
