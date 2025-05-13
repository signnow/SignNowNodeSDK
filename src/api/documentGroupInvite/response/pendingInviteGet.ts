/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Invite } from './data/invite';

export interface PendingInviteGet {
  invites: Invite[];
  document_group_name: string;
  sign_as_merged: boolean;
  owner_organization_id?: string | null;
}
