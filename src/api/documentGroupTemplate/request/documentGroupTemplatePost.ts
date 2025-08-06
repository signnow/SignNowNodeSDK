/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { BaseClass } from '../../../types/baseClass';
import { HttpMethod } from '../../../core/constants';
import { HttpAuthType } from '../../../core/constants';

export class DocumentGroupTemplatePost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private templateGroupId: string,
    private groupName: string,
    private clientTimestamp: string | null = null,
    private folderId: string | null = null,
  ) {}

  public getPayload(): Record<string, string | null> {
    return {
      template_group_id: this.templateGroupId,
      group_name: this.groupName,
      client_timestamp: this.clientTimestamp,
      folder_id: this.folderId,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/v2/document-group-templates/{template_group_id}/document-group';
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

  public getUriParams(): { template_group_id: string } {
    return {
      template_group_id: this.templateGroupId,
    };
  }
}
