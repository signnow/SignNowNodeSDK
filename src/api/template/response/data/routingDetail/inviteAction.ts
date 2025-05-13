/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Authentication } from './authentication';

export interface InviteAction {
  email: string;
  document_id: string;
  document_name: string;
  allow_reassign: number;
  decline_by_signature: number;
  lock: boolean;
  action: string;
  role_name: string;
  authentication?: Authentication;
}
