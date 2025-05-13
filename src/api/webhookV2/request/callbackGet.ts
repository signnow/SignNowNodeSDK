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

export class CallbackGet implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private eventSubscriptionId: string,
    private callbackId: string,
  ) {}

  public getPayload(): Record<string, string> {
    return {
      event_subscription_id: this.eventSubscriptionId,
      callback_id: this.callbackId,
    };
  }

  public getMethod(): string {
    return HttpMethod.GET;
  }

  public getUrl(): string {
    return '/v2/event-subscriptions/{event_subscription_id}/callbacks/{callback_id}';
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

  public getUriParams(): { event_subscription_id: string, callback_id: string } {
    return {
      event_subscription_id: this.eventSubscriptionId,
      callback_id: this.callbackId,
    };
  }
}
