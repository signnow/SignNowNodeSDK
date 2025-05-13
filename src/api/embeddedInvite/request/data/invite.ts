/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Authentication } from './authentication';

export interface Invite {
  email: string;
  role_id: string;
  order: number;
  auth_method: string;
  language?: string;
  first_name?: string;
  last_name?: string;
  prefill_signature_name?: string;
  required_preset_signature_name?: string;
  force_new_signature?: number;
  redirect_uri?: string;
  decline_redirect_uri?: string;
  redirect_target?: string;
  authentication?: Authentication | null;
}
