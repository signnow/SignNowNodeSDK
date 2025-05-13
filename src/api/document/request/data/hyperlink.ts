/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Hyperlink {
  x: number;
  y: number;
  size: number;
  width: number;
  height: number;
  page_number: number;
  font: string;
  line_height: number;
  field_id?: string;
}
