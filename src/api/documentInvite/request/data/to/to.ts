/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailGroup } from './emailGroup';
import { Signature } from './signature';

export interface To {
  email: string;
  role_id: string;
  role: string;
  order: number;
  subject: string;
  message: string;
  email_group?: EmailGroup;
  prefill_signature_name?: string;
  required_preset_signature_name?: string;
  force_new_signature?: number;
  reassign?: string;
  decline_by_signature?: string;
  reminder?: number | null;
  expiration_days?: number | null;
  authentication_type?: string;
  password?: string;
  phone?: string;
  phone_invite?: string;
  method?: string;
  authentication_sms_message?: string;
  redirect_uri?: string;
  decline_redirect_uri?: string;
  close_redirect_uri?: string;
  redirect_target?: string;
  language?: string;
  signature?: Signature;
}
