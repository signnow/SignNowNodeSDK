/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Header } from './header';

export interface Attribute {
  callback: string;
  delete_access_token?: boolean;
  use_tls12?: boolean;
  integration_id?: string;
  docid_queryparam?: boolean;
  headers?: Header | null;
  include_metadata?: boolean;
  secret_key?: string;
}
