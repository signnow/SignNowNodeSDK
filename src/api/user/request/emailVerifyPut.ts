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

export class EmailVerifyPut implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private email: string,
    private verificationToken: string,
  ) {}

  public getPayload(): Record<string, string> {
    return {
      email: this.email,
      verification_token: this.verificationToken,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/user/email/verify';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BASIC;
  }

  public getContentType(): string {
    return 'application/json';
  }

  public getQueryParams(): Record<string, string> {
    return this.queryParams;
  }

  public getUriParams(): null {
    return null;
  }
}
