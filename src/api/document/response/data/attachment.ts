/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { JsonAttribute } from './jsonAttribute';

export interface Attachment {
  id: string;
  user_id: string;
  page_number: string;
  width: string;
  height: string;
  x: string;
  y: string;
  line_height: number;
  created: string;
  json_attributes: JsonAttribute;
  original_attachment_name?: string | null;
  filename?: string | null;
  file_type?: string | null;
  mime_type?: string | null;
  file_size?: string | null;
  allow_editing?: boolean;
}
