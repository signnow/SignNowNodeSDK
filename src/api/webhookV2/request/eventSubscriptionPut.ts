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

export class EventSubscriptionPut implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private eventSubscriptionId: string,
    private event: string,
    private entityId: string,
    private action: string,
    private attributes: Attribute,
  ) {}

  public getPayload(): Record<string, string | object> {
    return {
      event_subscription_id: this.eventSubscriptionId,
      event: this.event,
      entity_id: this.entityId,
      action: this.action,
      attributes: this.attributes,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/v2/event-subscriptions/{event_subscription_id}';
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
