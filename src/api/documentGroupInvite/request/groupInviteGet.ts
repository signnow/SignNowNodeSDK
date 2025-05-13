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

export class GroupInviteGet implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentGroupId: string,
    private inviteId: string,
  ) {}

  public getPayload(): Record<string, string> {
    return {
      document_group_id: this.documentGroupId,
      invite_id: this.inviteId,
    };
  }

  public getMethod(): string {
    return HttpMethod.GET;
  }

  public getUrl(): string {
    return '/documentgroup/{document_group_id}/groupinvite/{invite_id}';
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

  public getUriParams(): { document_group_id: string; invite_id: string } {
    return {
      document_group_id: this.documentGroupId,
      invite_id: this.inviteId,
    };
  }
}
