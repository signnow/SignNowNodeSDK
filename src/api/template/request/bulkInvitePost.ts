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

export class BulkInvitePost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentId: string,
    private file: string,
    private folderId: string,
    private clientTimestamp: number = 0,
    private documentName: string = '',
    private subject: string = '',
    private emailMessage: string = '',
  ) {}

  public getPayload(): Record<string, string | number> {
    return {
      document_id: this.documentId,
      file: this.file,
      folder_id: this.folderId,
      client_timestamp: this.clientTimestamp,
      document_name: this.documentName,
      subject: this.subject,
      email_message: this.emailMessage,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/template/{document_id}/bulkinvite';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BEARER;
  }

  public getContentType(): string {
    return 'multipart/form-data';
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
