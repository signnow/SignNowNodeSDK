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
  id: string;
  user_id: string;
  name: string;
  server_created_timestamp: string;
  x: string;
  y: string;
  size: string;
  line_height: string;
  page_number: string;
  is_printed: boolean;
  font: string;
  original_font_size: string;
  radio: Radio[];
}
