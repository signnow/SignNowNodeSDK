/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Reminder } from './reminder';
import { Authentication } from './authentication';

export interface Attribute {
  allow_forwarding: boolean;
  show_decline_button: boolean;
  i_am_recipient: boolean;
  message?: string;
  subject?: string;
  expiration_days?: number;
  reminder?: Reminder;
  authentication?: Authentication;
}
