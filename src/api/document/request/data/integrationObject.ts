/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface IntegrationObject {
  x: number;
  y: number;
  size: number;
  width: number;
  height: number;
  page_number: number;
  font: string;
  data: string;
  status: number;
  color: string;
  created: number;
  active: boolean;
  line_height: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  field_id?: string;
  api_integration_id?: string | null;
}
