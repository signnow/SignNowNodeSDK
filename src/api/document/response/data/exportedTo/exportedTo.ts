/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Storage } from './storage';

export interface ExportedTo {
  export_domain: string;
  is_exported: boolean;
  exported_user_ids: string[];
  storages?: Storage[];
}
