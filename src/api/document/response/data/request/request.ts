/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailStatus } from './emailStatus';

export interface Request {
  id: string;
  unique_id: string;
  user_id: string;
  created: string;
  originator_email: string | null;
  signer_email: string | null;
  redirect_target: string;
  signature_id?: string | null;
  signer_user_id?: string | null;
  canceled?: boolean | null;
  redirect_uri?: string | null;
  close_redirect_uri?: string | null;
  language?: string | null;
  email_statuses?: EmailStatus[];
}
