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
import { To } from './data/to';
import { EmailGroup } from './data/emailGroup/emailGroup';
import { CcStep } from './data/ccStep';
import { Viewer } from './data/viewer';

export class SendInvitePost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentId: string,
    private to: To[],
    private from: string,
    private subject: string,
    private message: string,
    private emailGroups: EmailGroup[] = [],
    private cc: string[] = [],
    private ccStep: CcStep[] = [],
    private viewers: Viewer[] = [],
    private ccSubject: string = '',
    private ccMessage: string = '',
  ) {}

  public getPayload(): Record<string, string | To[] | EmailGroup[] | string[] | CcStep[] | Viewer[]> {
    return {
      document_id: this.documentId,
      to: this.to,
      from: this.from,
      email_groups: this.emailGroups,
      cc: this.cc,
      cc_step: this.ccStep,
      viewers: this.viewers,
      subject: this.subject,
      message: this.message,
      cc_subject: this.ccSubject,
      cc_message: this.ccMessage,
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
