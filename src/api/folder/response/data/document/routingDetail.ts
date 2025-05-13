/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Data } from './data';

export interface RoutingDetail {
  id: string;
  created: string;
  updated: string;
  data?: Data | null;
  invite_link_instructions?: string | null;
}
