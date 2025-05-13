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
  name?: string;
  label?: string;
  bold?: boolean;
  underline?: boolean;
  max_lines?: number;
  validator_id?: string;
}
