/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Hyperlink {
  id: string;
  page_number: string;
  x: string;
  y: string;
  font: string;
  size: string;
  data: string;
  label: string;
  line_height: string;
  original_font_size: string;
  created: string;
  allow_editing: boolean;
  user_id?: string | null;
  email?: string;
}
