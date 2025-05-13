/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailGroup } from './emailGroup';

export interface InviteEmail {
  email: string;
  subject: string;
  message: string;
  email_group?: EmailGroup;
  expiration_days?: number;
  reminder?: number;
}
