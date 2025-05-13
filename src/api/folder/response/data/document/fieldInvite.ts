/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailSentStatus } from './emailSentStatus';
import { EmailGroup } from './emailGroup';

export interface FieldInvite {
  id: string;
  signer_user_id: string;
  status: string;
  created: string;
  updated: string;
  email: string;
  role: string;
  role_id: string;
  email_sent_statuses: EmailSentStatus[];
  is_document_locked: string;
  password_protected: string;
  password_type: string;
  password_method: string;
  reassign: string;
  id_verification_required: string;
  id_verified: string;
  email_group: EmailGroup;
  reminder?: string | null;
  expiration_time?: string | null;
  electronic_consent_id?: string | null;
  prefill_signature_name?: string | null;
  force_new_signature?: string | null;
  electronic_consent_required?: string | null;
  decline_by_signature?: string | null;
  signing_instructions?: string | null;
  payment_request?: string | null;
  is_draft_exists?: string | null;
  is_full_declined?: string | null;
  is_embedded?: string | null;
  delivery_type?: string | null;
  signer_phone_invite?: string | null;
  signature_type?: string | null;
}
