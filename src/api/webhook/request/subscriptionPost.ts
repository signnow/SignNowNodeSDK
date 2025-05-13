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
import { Attribute } from './data/attribute';

export class SubscriptionPost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private event: string,
    private entityId: string,
    private action: string = '',
    private attributes: Attribute = { callback: '' },
    private secretKey: string = '',
  ) {}

  public getPayload(): Record<string, string | object> {
    return {
      event: this.event,
      entity_id: this.entityId,
      action: this.action,
      attributes: this.attributes,
      secret_key: this.secretKey,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/api/v2/events';
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
