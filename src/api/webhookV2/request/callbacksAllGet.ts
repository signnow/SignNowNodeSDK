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

export class CallbacksAllGet implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(private eventSubscriptionId: string) {}

  public getPayload(): Record<string, string> {
    return {
      event_subscription_id: this.eventSubscriptionId,
    };
  }

  public getMethod(): string {
    return HttpMethod.GET;
  }

  public getUrl(): string {
    return '/v2/event-subscriptions/{event_subscription_id}/callbacks';
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

  public getUriParams(): { event_subscription_id: string } {
    return {
      event_subscription_id: this.eventSubscriptionId,
    };
  }
}
