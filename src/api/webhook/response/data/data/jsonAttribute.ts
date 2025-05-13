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
  docid_queryparam: boolean;
  callback_url: string;
  integration_id?: string | null;
  headers?: Header | null;
  secret_key?: string;
}
