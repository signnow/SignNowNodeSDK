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
import { Invite } from './data/invite/invite';

export class GroupInvitePost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentGroupId: string,
    private invites: Invite[],
    private signAsMerged: boolean,
  ) {}

  public getPayload(): Record<string, string | Invite[] | boolean> {
    return {
      document_group_id: this.documentGroupId,
      invites: this.invites,
      sign_as_merged: this.signAsMerged,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/v2/document-groups/{document_group_id}/embedded-invites';
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

  public getUriParams(): { document_group_id: string } {
    return {
      document_group_id: this.documentGroupId,
    };
  }
}
