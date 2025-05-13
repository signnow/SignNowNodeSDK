/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { JsonAttribute } from './jsonAttribute';
import { Content } from './content';

export interface Data {
  id: string;
  event: string;
  entity_id: number;
  action: string;
  json_attributes: JsonAttribute;
  created: number;
  content?: Content;
}
