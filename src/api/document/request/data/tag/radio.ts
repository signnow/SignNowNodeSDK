/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Radio {
  page_number: number;
  x: number;
  y: number;
  width: number;
  height: number;
  checked?: string;
  value?: string;
  x_offset?: number;
  y_offset?: number;
}
