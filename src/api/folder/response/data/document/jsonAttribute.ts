/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface JsonAttribute {
  page_number: number;
  x: number;
  y: number;
  width: number;
  height: number;
  required: boolean;
  label?: string | null;
  name?: string | null;
  color?: string | null;
  bold?: boolean | null;
  italic?: boolean | null;
  underline?: boolean | null;
  align?: string | null;
  valign?: string | null;
  font?: string | null;
  size?: number | null;
  font_size?: number | null;
  arrangement?: string | null;
  max_lines?: number | null;
  max_chars?: number | null;
}
