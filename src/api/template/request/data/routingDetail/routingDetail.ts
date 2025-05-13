/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { InviteStep } from './inviteStep';

export interface RoutingDetail {
  invite_steps: InviteStep[];
  include_email_attachments: number;
}
