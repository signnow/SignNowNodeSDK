/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Thumbnail } from './thumbnail';

export interface Document {
  id: string;
  roles: string[];
  document_name: string;
  thumbnail: Thumbnail;
  origin_document_id?: string | null;
  has_unassigned_field?: boolean;
  has_credit_card_number?: boolean;
}
