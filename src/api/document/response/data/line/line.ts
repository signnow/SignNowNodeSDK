/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Line {
  id: string;
  page_number: string;
  subtype: string;
  x: string;
  y: string;
  width: string;
  height: string;
  line_width: string;
  control_points: number[];
  created: string;
  allow_editing: boolean;
  user_id?: string | null;
  email?: string;
  fill_color?: string | null;
}
