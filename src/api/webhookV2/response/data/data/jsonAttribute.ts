/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Header } from './header';

export interface JsonAttribute {
  use_tls12: boolean;
  callback_url: string;
  docid_queryparam?: boolean;
  integration_id?: string | null;
  headers?: Header | null;
  include_metadata?: boolean;
  delete_access_token?: boolean;
}
