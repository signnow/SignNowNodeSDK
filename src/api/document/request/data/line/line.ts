/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Line {
  x: number;
  y: number;
  width: number;
  height: number;
  subtype: string;
  page_number: number;
  fill_color: string;
  line_width: number;
  control_points?: number[];
}
