/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface RoutingDetail {
  name: string;
  role_id: string;
  default_email: string;
  inviter_role: boolean;
  signing_order: number;
  decline_by_signature?: boolean;
  delivery_type?: string | null;
}
