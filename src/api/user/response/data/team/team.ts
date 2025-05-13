/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Admin } from './admin';

export interface Team {
  id: string;
  team: string;
  type: string;
  created_since: string;
  role: string;
  document_count: number;
  admins: Admin[];
  workspace_id?: string | null;
}
