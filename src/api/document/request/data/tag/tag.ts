/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Radio } from './radio';

export interface Tag {
  type: string;
  x: number;
  y: number;
  page_number: number;
  role: string;
  required: boolean;
  width: number;
  height: number;
  tag_name?: string;
  name?: string;
  label?: string;
  align?: string;
  valign?: string;
  prefilled_text?: string;
  validator_id?: string;
  dependency?: string;
  hint?: string;
  link?: string;
  custom_defined_option?: boolean;
  lock_to_sign_date?: boolean;
  radio?: Radio[];
  enumeration_options?: string[];
}
