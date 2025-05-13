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

export class GroupTemplateGet implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(private templateId: string) {}

  public getPayload(): Record<string, string> {
    return {
      template_id: this.templateId,
    };
  }

  public getMethod(): string {
    return HttpMethod.GET;
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
