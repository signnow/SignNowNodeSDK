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

export class UserPut implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private firstName: string,
    private lastName: string,
    private password: string = '',
    private oldPassword: string = '',
    private logoutAll: string = '',
  ) {}

  public getPayload(): Record<string, string> {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      password: this.password,
      old_password: this.oldPassword,
      logout_all: this.logoutAll,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/user';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BEARER;
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
