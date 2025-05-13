/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { InviteEmail } from './inviteEmail';
import { InviteAction } from './inviteAction';

export interface InviteStep {
  order: number;
  invite_actions: InviteAction[];
  invite_emails?: InviteEmail[];
}
