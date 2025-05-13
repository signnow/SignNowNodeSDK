/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface EnumerationOption {
  id: string;
  page_number: string | null;
  width: string | null;
  height: string | null;
  created: number;
  enumeration_id?: string | null;
  user_id?: string | null;
  data?: string | null;
  email?: string | null;
  x?: string | null;
  y?: string | null;
}
