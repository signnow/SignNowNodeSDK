/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Radio } from './radio';

export interface Radiobutton {
  page_number: number;
  x: number;
  y: number;
  line_height: number;
  status: number;
  is_printed: number;
  size: number;
  subtype: string;
  name: string;
  font: string;
  radio: Radio[];
  field_id?: string;
}
