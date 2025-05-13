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
import { InviteStep } from './data/inviteStep/inviteStep';
import { EmailGroup } from './data/emailGroup/emailGroup';
import { CompletionEmail } from './data/completionEmail';

export class GroupInvitePost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentGroupId: string,
    private inviteSteps: InviteStep[],
    private cc: string[],
    private emailGroups: EmailGroup[] = [],
    private completionEmails: CompletionEmail[] = [],
    private signAsMerged: boolean = true,
    private clientTimestamp: number = 0,
    private ccSubject: string = '',
    private ccMessage: string = '',
  ) {}

  public getPayload(): Record<string, string | InviteStep[] | EmailGroup[] | CompletionEmail[] | boolean | number | string[]> {
    return {
      document_group_id: this.documentGroupId,
      invite_steps: this.inviteSteps,
      email_groups: this.emailGroups,
      completion_emails: this.completionEmails,
      sign_as_merged: this.signAsMerged,
      client_timestamp: this.clientTimestamp,
      cc: this.cc,
      cc_subject: this.ccSubject,
      cc_message: this.ccMessage,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/documentgroup/{document_group_id}/groupinvite';
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
