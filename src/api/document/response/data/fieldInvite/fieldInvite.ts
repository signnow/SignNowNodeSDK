/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailGroup } from './emailGroup';
import { EmailStatus } from './emailStatus';
import { Declined } from './declined';
import { EmbeddedSigner } from './embeddedSigner';

export interface FieldInvite {
  id: string;
  signer_user_id: string;
  status: string;
  password_protected: string;
  created: string;
  updated: string;
  email_group: EmailGroup;
  email: string;
  email_statuses: EmailStatus[];
  role: string;
  role_id: string;
  reminder: string;
  expiration_time: string | null;
  redirect_target: string;
  is_full_declined: boolean;
  is_embedded: boolean;
  is_document_locked: string;
  declined: Declined[];
  delivery_type: string;
  id_verification_required: string;
  id_verified: string;
  embedded_signer: EmbeddedSigner[];
  language: string | null;
  signer_phone_invite?: string | null;
  password_type?: string;
  password_method?: string;
  reassign?: string;
  pfrmerchant_account_name?: string | null;
  redirect_uri?: string | null;
  decline_redirect_uri?: string | null;
  close_redirect_uri?: string | null;
  is_draft_exists?: string;
  required_preset_signature_name?: string | null;
  decline_by_signature?: string | null;
  electronic_consent_required?: number | null;
  payment_request?: string | null;
  pfrid?: string | null;
  pfrtype?: string | null;
  pfrmerchant_id?: string | null;
  pfrstatus?: string | null;
  pframount?: string | null;
  pfrpayment_transaction_id?: string | null;
  pfrcreated?: string | null;
  pfrmerchant_type?: string | null;
  pfrcurrency_name?: string | null;
  pfrjson_attributes?: string | null;
  electronic_consent_id?: string | null;
  stripe_ach_bank_account_verified?: string;
  stripe_ach_bank_account_present?: string;
  prefill_signature_name?: string | null;
  force_new_signature?: number | null;
  signing_instructions?: string | null;
  signature_type?: string | null;
}
