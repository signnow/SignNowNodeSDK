/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { FreeformInvite } from './freeformInvite';

export interface DocumentGroupInfo {
  freeform_invite: FreeformInvite;
  document_group_id?: string | null;
  document_group_name?: string | null;
  invite_id?: string | null;
  invite_status?: string | null;
  state?: string | null;
  doc_count_in_group?: number | null;
  sign_as_merged?: boolean | null;
}
