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

export class FreeFormInvitePost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentId: string,
    private to: string,
    private from: string | null = null,
    private cc: string[] = [],
    private subject: string | null = null,
    private message: string | null = null,
    private ccSubject: string | null = null,
    private ccMessage: string | null = null,
    private language: string | null = null,
    private clientTimestamp: number | null = null,
    private callbackUrl: string | null = null,
    private isFirstInviteInSequence: boolean | null = null,
    private redirectUri: string | null = null,
    private closeRedirectUri: string | null = null,
    private redirectTarget: string = '',
  ) {}

  public getPayload(): Record<string, string | null | string[] | number | boolean> {
    return {
      document_id: this.documentId,
      to: this.to,
      from: this.from,
      cc: this.cc,
      subject: this.subject,
      message: this.message,
      cc_subject: this.ccSubject,
      cc_message: this.ccMessage,
      language: this.language,
      client_timestamp: this.clientTimestamp,
      callback_url: this.callbackUrl,
      is_first_invite_in_sequence: this.isFirstInviteInSequence,
      redirect_uri: this.redirectUri,
      close_redirect_uri: this.closeRedirectUri,
      redirect_target: this.redirectTarget,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/document/{document_id}/invite';
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
