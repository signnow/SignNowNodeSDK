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
import { RoutingDetail } from './data/routingDetail/routingDetail';

export class GroupTemplatePut implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private templateId: string,
    private routingDetails: RoutingDetail,
    private templateGroupName: string,
    private templateIdsToAdd: string[] = [],
    private templateIdsToRemove: string[] = [],
  ) {}

  public getPayload(): Record<string, string | string[] | object> {
    return {
      template_id: this.templateId,
      template_ids_to_add: this.templateIdsToAdd,
      template_ids_to_remove: this.templateIdsToRemove,
      routing_details: this.routingDetails,
      template_group_name: this.templateGroupName,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/documentgroup/template/{template_id}';
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

  public getUriParams(): { template_id: string } {
    return {
      template_id: this.templateId,
    };
  }
}
