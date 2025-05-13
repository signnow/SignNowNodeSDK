/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { JsonAttribute } from './jsonAttribute';

export interface Field {
  id: string;
  type: string;
  role_id: string;
  json_attributes: JsonAttribute;
  role: string;
  originator: string;
  fulfiller?: string | null;
  field_request_id?: string | null;
  element_id?: string | null;
  template_field_id?: string | null;
  field_id?: string | null;
}
