/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Folder } from './data/folder';
import { Document } from './data/document/document';

export interface FolderGet {
  id: string;
  created: number;
  name: string;
  user_id: string;
  system_folder: boolean;
  shared: boolean;
  folders: Folder[];
  total_documents: number;
  documents: Document[];
  parent_id?: string | null;
  team_name?: string | null;
  team_id?: string | null;
  team_type?: string | null;
}
