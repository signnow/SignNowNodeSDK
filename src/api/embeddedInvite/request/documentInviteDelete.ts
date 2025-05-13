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

export class DocumentInviteDelete implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(private documentId: string) {}

  public getPayload(): Record<string, string> {
    return {
      document_id: this.documentId,
    };
  }

  public getMethod(): string {
    return HttpMethod.DELETE;
  }

  public getUrl(): string {
    return '/v2/documents/{document_id}/embedded-invites';
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

  public getUriParams(): { document_id: string } {
    return {
      document_id: this.documentId,
    };
  }
}
