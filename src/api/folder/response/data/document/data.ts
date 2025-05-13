/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Reminder } from './reminder';

export interface Data {
  name?: string | null;
  inviter_role?: boolean | null;
  signing_order?: number | null;
  delivery_type?: string | null;
  default_email?: string | null;
  role_id?: string | null;
  decline_by_signature?: boolean | null;
  reassign?: boolean | null;
  expiration_days?: number | null;
  reminder?: Reminder | null;
}
