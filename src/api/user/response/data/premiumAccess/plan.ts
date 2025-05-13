/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Plan {
  id: number;
  plan_id: string;
  name: string;
  price: string;
  billing_cycle: number;
  active: boolean;
  groups: string[];
  level: string;
  type: string;
  api_requests: number;
  unit_price: number;
  is_trial: boolean;
  is_marketplace: boolean;
}
