/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Document } from './document';
import { Owner } from './owner';

export interface Data {
  unique_id: string;
  name: string;
  created: number;
  state: string;
  owner_email: string;
  documents: Document[];
  owner: Owner;
  invite_id?: string | null;
  last_invite_id?: string | null;
}
