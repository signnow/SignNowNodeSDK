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

export class DocumentInviteLinkPost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentId: string,
    private fieldInviteId: string,
    private authMethod: string = '',
    private linkExpiration: number = 0,
  ) {}

  public getPayload(): Record<string, string | number> {
    return {
      document_id: this.documentId,
      field_invite_id: this.fieldInviteId,
      auth_method: this.authMethod,
      link_expiration: this.linkExpiration,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/v2/documents/{document_id}/embedded-invites/{field_invite_id}/link';
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

  public getUriParams(): { document_id: string; field_invite_id: string } {
    return {
      document_id: this.documentId,
      field_invite_id: this.fieldInviteId,
    };
  }
}
