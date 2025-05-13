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
import { InviteEmail } from './data/inviteEmail';
import { UpdateInviteActionAttribute } from './data/updateInviteActionAttribute';

export class ReassignSignerPost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentGroupId: string,
    private inviteId: string,
    private stepId: string,
    private userToUpdate: string,
    private replaceWithThisUser: string = '',
    private inviteEmail: InviteEmail = [],
    private updateInviteActionAttributes: UpdateInviteActionAttribute[] = [],
  ) {}

  public getPayload(): Record<string, string | object | UpdateInviteActionAttribute[]> {
    return {
      document_group_id: this.documentGroupId,
      invite_id: this.inviteId,
      step_id: this.stepId,
      user_to_update: this.userToUpdate,
      replace_with_this_user: this.replaceWithThisUser,
      invite_email: this.inviteEmail,
      update_invite_action_attributes: this.updateInviteActionAttributes,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/documentgroup/{document_group_id}/groupinvite/{invite_id}/invitestep/{step_id}/update';
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

  public getUriParams(): { document_group_id: string; invite_id: string; step_id: string } {
    return {
      document_group_id: this.documentGroupId,
      invite_id: this.inviteId,
      step_id: this.stepId,
    };
  }
}
