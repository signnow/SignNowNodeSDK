/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Field {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  page_number: number;
  required: boolean;
  role: string;
  custom_defined_option?: boolean;
  name?: string;
  tooltip?: string;
  formula?: string;
  conditional?: boolean;
  stretch_to_grid?: boolean;
  active?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  subtype?: string;
  align?: string;
  calculation_precision?: string;
  color?: string;
  label?: string;
  validator_id?: string;
}
