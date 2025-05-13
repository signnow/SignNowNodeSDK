/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface InviteAction {
  email: string;
  role_name: string;
  action: string;
  document_id: string;
  document_name: string;
  allow_reassign?: string;
  decline_by_signature?: string;
}
