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

export class UserPost implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private email: string,
    private password: string,
    private firstName: string = '',
    private lastName: string = '',
    private number: string = '',
  ) {}

  public getPayload(): Record<string, string> {
    return {
      email: this.email,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      number: this.number,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/user';
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
