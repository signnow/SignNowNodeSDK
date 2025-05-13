/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface InviteEmail {
  email: string;
  subject: string;
  message: string;
  allow_reassign: string;
  expiration_days?: number;
  reminder?: number;
}
