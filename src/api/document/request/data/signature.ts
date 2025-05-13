/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Signature {
  x: number;
  y: number;
  width: number;
  height: number;
  page_number: number;
  data: string;
  subtype?: string;
  signature_request_id?: string;
  field_id?: string;
  signing_reason?: string;
  owner_as_recipient?: boolean;
}
