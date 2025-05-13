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
  use_tls_12?: boolean;
  integration_id?: string;
  docid_queryparam?: boolean;
  headers?: Header | null;
}
