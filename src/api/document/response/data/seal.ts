/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Seal {
  id: string;
  page_number: string;
  x: string;
  y: string;
  width: string;
  height: string;
  created: string;
  unique_id?: string | null;
  customer_user_id?: string | null;
  email?: string;
  transaction_id?: string | null;
  data?: string;
}
