/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailGroup } from './emailGroup';
import { EmailStatus } from './emailStatus';

export interface ViewerFieldInvite {
  id: string;
  status: string;
  created: string;
  updated: string;
  email: string;
  redirect_target: string;
  email_group: EmailGroup;
  email_statuses: EmailStatus[];
  signer_user_id?: string | null;
  role?: string | null;
  role_id?: string | null;
  close_redirect_uri?: string | null;
}
